# hkayesh.github.io

Personal portfolio website of **Humayun Kayesh, PhD** — AI/ML, NLP, Data Science.
Live site: <https://hkayesh.github.io>

Built with [Jekyll](https://jekyllrb.com/) using the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme (`v4.24.0`, loaded via `remote_theme`), and hosted for free on **GitHub Pages**.

## Project Structure

The homepage is a custom dark "editorial" one-page design built on the Minimal Mistakes theme.

| Path | Purpose |
|---|---|
| `_config.yml` | Global site configuration (title, author, social links, plugins, collections) |
| `_layouts/landing.html` | Custom homepage layout — renders the section stack |
| `_includes/sections/` | Homepage sections: hero, credibility, work, skills, experience, publications, beyond, contact |
| `_includes/project-card.html` | Case-study card (used by the homepage and `/portfolio/`) |
| `_includes/timeline.html`, `_includes/skills-groups.html` | Shared partials (homepage and `/experience/`, `/skills/`) |
| `_sass/minimal-mistakes/skins/_editorial.scss` | Custom dark skin (navy/off-white/electric blue, Fraunces + Inter) |
| `_sass/custom.scss` | All editorial section styles and reveal motion |
| `assets/js/landing.js` | Hero canvas, scroll reveals, timeline progress (no dependencies) |
| `_data/experience.yml` | Timeline roles, impact bullets, standout achievements |
| `_data/skills.yml` | Grouped expertise pills |
| `_data/publications.yml` | Paper cards (title, venue, snippet, topics, citations, links) |
| `_data/credibility.yml` | Credibility-strip stats and organisations |
| `_pages/` | Secondary pages (Portfolio, Experience, Skills, Education, CV, etc.) |
| `_portfolio/` | Portfolio/case-study entries (featured ones appear on the homepage) |
| `assets/files/` | Résumé PDF and other downloads |
| `Gemfile` | Ruby dependencies for local development (Jekyll 4) |

## Run Locally

### Prerequisites

- **Ruby 3.2+** (works with Ruby 4.x) with **Bundler**
  - ⚠️ The system Ruby that ships with macOS (2.6.x) is too old. Install a newer Ruby via [Homebrew](https://brew.sh/) (`brew install ruby`) or a version manager such as [rbenv](https://github.com/rbenv/rbenv)/[asdf](https://asdf-vm.com/).
  - Make sure the new Ruby is on your `PATH`, then run `gem install bundler`.
- **Node.js** *(optional)* — only required if you modify the JavaScript source files under `assets/js/`.
- An **internet connection** during the first build — the Minimal Mistakes theme is fetched remotely (`remote_theme` in `_config.yml`).

> **Why doesn't the Gemfile use the `github-pages` gem?** GitHub Pages always
> builds the site remotely with its own pinned environment and ignores the local
> Gemfile entirely. The old `github-pages` stack (Jekyll 3.9 / Liquid 4.0.3)
> cannot run on modern Ruby (3.4+/4.x), so the Gemfile uses current Jekyll 4
> purely for local development. The live site on GitHub Pages is unaffected.

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/hkayesh/hkayesh.github.io.git
cd hkayesh.github.io

# 2. Install Ruby dependencies
bundle install

# 3. Serve the site locally (with live reload)
bundle exec jekyll serve --livereload
```

Then open <http://localhost:4000> in your browser.

**Notes:**

- Changes to `_config.yml` are **not** picked up automatically — restart the server after editing it.
- Sass deprecation warnings from the theme's vendored Susy library are harmless noise.
- To build without serving (output goes to `_site/`): `bundle exec jekyll build`.
- If you edit JS source files (`assets/js/_main.js`, `assets/js/plugins/*`), rebuild the minified bundle:
  ```bash
  npm install
  npm run build:js   # or: npm run watch:js to rebuild on change
  ```

## Publish on GitHub Pages

This repository is a **GitHub user pages site** (named `<username>.github.io`), so GitHub builds and deploys it automatically from the **`master` branch** — no GitHub Actions or extra CI needed.

### Everyday publishing workflow

The repo uses `dev` for development and `master` for the live site:

```bash
# 1. Make your changes on the dev branch
git checkout dev
# ...edit content, then test locally with `bundle exec jekyll serve`...
git add .
git commit -m "Describe your changes"
git push origin dev

# 2. Publish: merge dev into master and push
git checkout master
git merge dev
git push origin master

# 3. Switch back to dev for continued work
git checkout dev
```

GitHub Pages will build the site automatically within a minute or two, and the changes appear at <https://hkayesh.github.io>. You can watch build status under the repo's **Actions** tab (GitHub shows Pages build jobs there) or in **Settings → Pages**.

### First-time setup (if forking/recreating)

1. Name the repository `<your-username>.github.io`.
2. In **Settings → Pages → Build and deployment**, set **Source** to **"Deploy from a branch"** and select the `master` branch with the `/ (root)` folder.
3. Update `_config.yml` to match your identity:
   - `url: "https://<your-username>.github.io"`
   - `repository: <your-username>/<your-username>.github.io`
   - `title`, `name`, `description`, `author`, and social links.
4. Push to `master` — the site goes live at `https://<your-username>.github.io`.

> The `remote_theme` plugin is supported natively by GitHub Pages, so the site builds identically in the cloud and locally.

## License

See [LICENSE](LICENSE). Theme: Minimal Mistakes, © Michael Rose, MIT License.
