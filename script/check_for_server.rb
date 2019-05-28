#! /usr/bin/env ruby

require 'rubygems'
require 'bundler'
Bundler.setup(:default, :development)
require 'dotenv/load'
require 'typhoeus'
require 'colored2'

def check_for_running_rosalind_server!
  response = Typhoeus.get(app_url)

  if looks_like_rosalind?(response)
    puts "Found Rosalind server at #{app_url}".green
    exit 0

  elsif no_server?(response)
    fail_with "There is no server running at #{app_url}".red
  else
    fail_with "The server running at #{app_url} does not appear to be Rosalind".red
  end
end

def app_url
  "http://localhost:#{port}/"
end

def port
  (ENV['PORT'] || 5000).to_i
end

def looks_like_rosalind?(response)
  response.headers['Set-Cookie'] =~ /rosalind/i
end

def no_server?(response)
  response.return_code == :couldnt_connect
end

def fail_with(msg)
  puts
  puts msg
  puts
  puts 'You must have a running Rosalind rails server in order to see accurate styles in Storybook'.red
  puts
  exit 1
end

check_for_running_rosalind_server!
