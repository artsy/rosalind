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

# Temporary install older chrome version
# Can be reverted back to stable once this project is under Ruby 3
# and Selenium is updated

ENV CHROME_VERSION 114.0.5735.90-1
RUN curl -o /tmp/chrome-114.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb
RUN apt-get update -qq && apt-get install -y nodejs libnss3 libgconf-2-4 && apt-get install -y /tmp/chrome-114.deb && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
# RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list

# RUN apt-get update -qq
# RUN apt-get install -y nodejs libnss3 libgconf-2-4 google-chrome-stable
# RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Disable Chrome sandbox
RUN sed -i 's|HERE/chrome"|HERE/chrome" --disable-setuid-sandbox --no-sandbox|g' "/opt/google/chrome/google-chrome"

RUN gem install bundler -v 2.4.22

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
