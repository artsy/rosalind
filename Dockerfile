FROM ruby:2.7.3-slim
ENV LANG C.UTF-8

ARG BUNDLE_GITHUB__COM

RUN apt-get update -qq && apt-get install -y \
  build-essential \
  curl \
  dumb-init \
  git \
  libpq-dev \
  postgresql-client \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install NodeJS apt sources
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

# Add Chrome source
RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list

RUN apt-get update -qq
RUN apt-get install -y nodejs libnss3 libgconf-2-4 google-chrome-stable
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Disable Chrome sandbox
RUN sed -i 's|HERE/chrome"|HERE/chrome" --disable-setuid-sandbox --no-sandbox|g' "/opt/google/chrome/google-chrome"

RUN gem update --system
RUN gem install bundler

RUN npm install -g yarn

# Set up deploy user, working directory and shared folders for Puma / Nginx
RUN adduser --disabled-password --gecos '' deploy && \
    mkdir -p /app && \
    chown deploy:deploy /app && \
    mkdir /shared && \
    mkdir /shared/config && \
    mkdir /shared/pids && \
    mkdir /shared/sockets && \
    chown -R deploy:deploy /shared

RUN gem install bundler:2.1.4

# Throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

# Set up gems
WORKDIR /tmp
ADD .ruby-version .ruby-version
ADD Gemfile Gemfile
ADD Gemfile.lock Gemfile.lock
RUN bundle install -j4 && \
    rm -rf /usr/local/bundle/cache

# Switch to deploy user
USER deploy
ENV USER deploy
ENV HOME /home/deploy

# Finally, add the rest of our app's code
# (this is done at the end so that changes to our app's code
# don't bust Docker's cache)
ADD --chown=deploy:deploy . /app
WORKDIR /app

RUN yarn install && yarn cache clean

# Precompile Rails assets
RUN bundle exec rake assets:precompile

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["bundle", "exec", "puma", "-C", "config/puma.config"]
