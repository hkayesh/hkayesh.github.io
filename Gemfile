source "https://rubygems.org"

# Local development stack.
#
# NOTE: GitHub Pages ignores this Gemfile when building the site remotely —
# it always uses its own pinned github-pages environment. The old
# github-pages gem (Jekyll 3.9 / Liquid 4.0.3) no longer runs on modern
# Ruby (3.4+/4.x), so for LOCAL builds we use current Jekyll instead.
gem "jekyll", "~> 4.3"
gem "webrick"

group :jekyll_plugins do
  gem "jekyll-remote-theme"
  gem "jekyll-paginate"
  gem "jekyll-sitemap"
  gem "jekyll-gist"
  gem "jekyll-feed"
  gem "jekyll-include-cache"
end
