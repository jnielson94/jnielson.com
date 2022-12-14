---
slug: git-rebase-with-merges
date: '2020-03-27'
title: 'Git Rebase... with Merges?'

coverImage: '/assets/blog/undraw_pull_request.png'
---

**Did you know that `git rebase -i` will drop merge commits by default?** I
certainly didn't realize that was happening until a time at work when I had to
keep the merge commits in as I rebased one branch to not have a feature anymore,
which had been merged in as a series of small pull requests... much like what
Sarah Drasner talked about in
[a sweet post on scoping down PRs](https://www.netlify.com/blog/2020/03/31/how-to-scope-down-prs/).

So, how do you keep merge commits when you need to rebase a branch and pull some
commits out? To learn more about why I wanted to keep the merge commits, I'll
push that to the end and get right into the main point:

> Note: Needs `git --version` to be greater than `v2.22.0` in order to have this
> feature

Generally to rebase a branch, I'll do something like:

`git rebase -i [some commit]`

Which gives some pretty neat output (generated during a livestream where I
worked up an example for this post,
[on Twitch](https://www.twitch.tv/videos/576429945) or
[archived on youtube](https://www.youtube.com/watch?v=hvMKaa2U6Vw)):

```shell
pick c349469 Add some proper punctuation
pick 282af3c Add some descriptive text to the readme
pick 1daf229 Remove sample text and clarify that this is in progress.

# Rebase d5941f3..2587717 onto d5941f3 (3 commands)
#
# I removed the instructions that usually go here in both examples
```

There's a lot of options of things you can do in a rebase, that git helpfully
outputs when you're working on it. But, the main thing to notice here is that
it's a list of normal commits, with no indication if there was a merge commit in
there.

So, if you need to keep merge commits around, here's your new friend:

`git rebase -i --rebase-merges [some commit]`

When you add the `--rebase-merges` option to `git rebase` it knows that you
actually care about those merge commits and doesn't throw them away. In doing
so, `git rebase` basically re-creates the entire branching history starting from
that commit. It calls the starting point `onto` (as you'll notice in the example
below), and adds some cool new commands to the interactive rebase options. These
are covered pretty well in
[the git rebase documentation](https://git-scm.com/docs/git-rebase). Here's the
gist, ideally in plainer english than the docs:

The `label` command creates a label, basically a pointer just like a branch,
that is deleted when the rebase is done.

The reset command resets the HEAD (pointer), index and worktree to the specified
revision (usually a `label` you made). Works like `git reset --hard <label>` but
without as much... force.

The merge command merges... Usually you want the -C option, which uses the
original message (and basically the original merge commit). Make it lower-case
(-c) if you want to adjust the message. If you leave off the -C option, it
thinks you're making a new merge commit.

So, here's an example of what that list might look like, again from the stream
([on Twitch](https://www.twitch.tv/videos/576429945) or
[archived on youtube](https://www.youtube.com/watch?v=hvMKaa2U6Vw)):

```shell
label onto

# Branch jnielson94-jn-quick-fix
reset onto
pick c349469 Add some proper punctuation
label jnielson94-jn-quick-fix

# Branch jnielson94-jn-add-more-text
reset onto
pick 282af3c Add some descriptive text to the readme
label jnielson94-jn-add-more-text

# Branch jnielson94-jn-clarify-text
reset onto
merge -C f041aa8 jnielson94-jn-quick-fix # Merge pull request #1 from jnielson94/jn-quick-fix
merge -C eb0f351 jnielson94-jn-add-more-text # Merge pull request #2 from jnielson94/jn-add-more-text
label branch-point
pick 1daf229 Remove sample text and clarify that this is in progress.
label jnielson94-jn-clarify-text

reset branch-point # Merge pull request #2 from jnielson94/jn-add-more-text
merge -C 2587717 jnielson94-jn-clarify-text # Merge pull request #3 from jnielson94/jn-clarify-text
```

Once you're in this view, you can interactively adjust whatever you needed to!
On the stream we switched the order the pull requests were merged in, by
swapping those two lines in the list.

## But why?

Alright, after all that you're still wondering why I wanted to do this. Here's
the story:

We've been working on a major new feature utilizing a feature branch,
`feature/xyz` for example. When working on things related to that, we branch off
`feature/xyz` (usually using a branch name like `jn-small-task`) and then merge
it into `feature/xyz` using merge commits in case we need to backport anything
over to production (`master` branch). We've avoided rebasing on `master` and
`feature/xyz` to be able to keep the commit history of the two interleaved
(though I rebase heavily on my little branches and occasionally for things that
don't need to be on `master`). So, in order to keep the ability to backport
we've kept merge commits on `feature/xyz` as much as possible. So, I rebased
`feature/xyz` to remove a feature (which had been merged in as a bunch of little
`jn-small-thing` branches), but I wanted to keep `jn-medium-feature` which had
all of them, but was rebased onto the new end of `feature/xyz`. Since I kept the
merge commits in both instances, `git rebase` did a great job handling pulling
them all to the end of the `jn-medium-feature` branch 🎉

And that is the story of why I needed this obscure/advanced git feature 😎

_Banner image courtesy of undraw.co_
