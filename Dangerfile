# PR Hygiene

if github.pr_body.length < 5
  fail 'Please provide a summary in the Pull Request description'
end

if git.commits.any? { |c| c.message =~ /^Merge branch 'master'/ }
  warn 'Please rebase to get rid of the merge commits in this PR'
end

# Complain if someone tries to re-enable jquery

jquery_suspects = %w(
  Gemfile.lock
  app/assets/javascripts/application.js
  app/views/layouts/application.html.haml
)
jquery_suspects.each do |file|
  diff = git.diff_for_file(file)
  if diff && diff.patch =~ /jquery/i
    warn "Please think twice before adding jQuery to the project 😱 (#{file})"
  end
end
