# PR Hygiene

messaging.fail 'Please provide a summary in the Pull Request description' if github.pr_body.length < 5

if git.commits.any? { |c| c.message =~ /^Merge branch 'master'/ }
  messaging.warn 'Please rebase to get rid of the merge commits in this PR'
end

# Complain if someone tries to re-enable jquery

def warn_if_adding(term:, files:)
  regexp = Regexp.new term
  files.each do |file|
    diff = git.diff_for_file(file)
    next unless diff

    added_lines = diff.patch.split(/\n/).select { |line| line =~ /^\+/ }
    warn "Please think twice before adding #{term} to the project 😱 (#{file})" if added_lines.any? { |line| line =~ regexp }
  end
end

warn_if_adding term: 'jquery', files: %w[
  Gemfile.lock
  app/assets/javascripts/application.js
  app/views/layouts/application.html.haml
]
