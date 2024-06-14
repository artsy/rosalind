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
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -

# Add Chrome source

# Temporary install older chrome version
# Can be reverted back to stable once this project is under Ruby 3
# and Selenium is updated
# We need to host our own tar of 114 because chrome has stopped hosting it
# This is even more reason to get to ruby 3.0 and later selenium and chrome

ENV CHROME_VERSION 114.0.5735.90
RUN curl -L -o /tmp/google-chrome.tar.gz https://artsy-public.s3.amazonaws.com/google-chrome/chrome_${CHROME_VERSION}_linux.tar.gz
RUN tar -xzf /tmp/google-chrome.tar.gz -C /tmp/
RUN apt -y install /tmp/${CHROME_VERSION}/install-dependencies.deb
RUN mkdir -p /opt/google/chrome
RUN cp -R /tmp/${CHROME_VERSION}/* /opt/google/chrome/

# Disable Chrome sandbox
RUN sed -i 's|HERE/chrome"|HERE/chrome" --disable-setuid-sandbox --no-sandbox|g' "/opt/google/chrome/google-chrome"

RUN apt-get update -qq && apt-get install -y nodejs libnss3 libgconf-2-4 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

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
