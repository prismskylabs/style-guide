# [Prism Skylabs Style Guide](http://prismskylabs.github.io/style-guide/)
This is inspired by [Bootstrap](http://getbootstrap.com/) and is meant to be a starting point and collection of base styles to be used by all Prism Skylabs web projects. The documentation and living guide can be viewed at <http://prismskylabs.github.io/style-guide>.

## Documentation
Documentation is a [Jekyll](http://jekyllrb.com) site that is publicly hosted at <http://prismskylabs.github.io/style-guide>. The docs may also be run locally.

### Running documentation locally
1. Install [Jekyll](http://jekyllrb.com) with `gem install jekyll`.
2. From the `docs/` directory, run `jekyll serve` in the command line.
3. View the documents at <http://localhost:4000>.

### Deploying documentation
The documents are hosted using GitHub Pages from the gh-pages branch. Since GitHub only allows you to run Jekyll with the source set to the root of the repository, we have to build the gh-pages branch as a subtree from master.
Run the following command from inside the repo to deploy the docs: `git subtree push --prefix dist origin gh-pages`.
Once that is done, the changes should be viewable nearly immediately.
