---
slug: sharpen-your-axe
date: '2019-07-03'
title: 'Sharpen Your Axe: Tools to Find Knowledge'

coverImage: '/assets/blog/undraw_learning.png'
---

<!--

Learning to fish: using documentation and online resources

A bunch of practical examples of solving real-world problems to help problem
solving principles "click"

Our goal: teaching to fish

Examples of finding solutions in official docs from different tools, like the
rows in the "Core" of:
https://ip.ldschurch.org/1271/document/recommended-technology

Suggestion: get familiar with these docs so when you hit certain things you have
a reference point

Examples of using changelogs / release notes from official repos

Examples of finding solutions in Google / Stack Overflow when official docs
don't have what you need

Warning to be careful of random blog posts / old stack overflow questions etc.

Mentors

Examples of dealing with errors in terminal, browser etc.

-->

What does it mean to "find knowledge"?

At work recently I've been reflecting a lot on the idea of "learning time" and
how to effectively utilize that time to progress as a developer and be able to
better do my job. In those musings, I've realized that a lot of the goal is to
improve your skills so that you can tackle new and different problems. As a
developer we have a number of physical skills such as typing, reading, talking,
breaking things down, and so on. But, in reality, a lot of what we do each day
revolves around the knowledge that we have built up and less on the physical
skills we have acquired over that time. This realization has helped me to refine
the focus of my "learning time" to more clearly articulate that my goal is to
find knowledge that I might not even know is out there.

## Orders of Ignorance

In college during my favorite Computer Science class I took we were assigned to
read something written by Phil Armour, an appendix to his book "The Laws of
Software Process" titled "The Five Orders of Ignorance". You can find his book
[on Amazon (maybe)](https://www.amazon.com/Laws-Software-Process-Production-Management/dp/0849314895)
and you can read the
[ACM article with the five orders of ignorance](http://www.corvusintl.com/CACM002-5OI.htm),
I personally used my professor's PDF from class that I still had on my computer.
In this appendix, he describes how software, the thing we work on each day, is a
knowledge medium and not a product. In describing this shift in mindset, he
includes 5 orders of ignorance:

1. Zero: Lack of Ignorance - You know these things
1. First: Lack of Knowledge - You know that you don't know these things
   (Questions you have)
1. Second: Lack of Awareness - You don't even know that you don't know this
1. Third: Lack of Process - I can't find out what I don't know (We'll focus
   here)
1. Fourth: Meta Ignorance - I don't know about these categories and think of
   software as a product produced

## Applying the Orders of Ignorance

In this post, we're going to focus on tackling **Third order ignorance**.

The format of this post will probably be a little different than future ones
since I have a talk I'm giving at work next week on this topic and I'm using
this to gather and begin to organize my thoughts.

As Armour states, Third Order Ignorance is a huge problem in the software
industry because if you don't have a "suitably efficient" process for increasing
your knowledge and awareness you'll go along shipping software and never
becoming better at it. In order to address this problem, there's a series of
approaches you can take:

- Focusing on Increasing Awareness
- Focusing on Increasing Knowledge
- Focusing on Increasing Speed
- Focusing on Increasing Communication

There's probably other ways you can approach strengthening your process of
learning, but these are the ones I chose because they are the most readily
apparent when considering the orders of ignorance and building software systems.
While there is nothing that inherently prohibits increasing all of these aspects
at once, I've found in my experience that generally you tackle one at a time.
Since the goal of this post is to help you have a process for reducing your
First and Second order ignorance, it's important to recognize that this might
not work for everyone. If you have a different approach that works for you,
[tweet me (jnielson94) about it!](https://twitter.com/jnielson94)

## Focusing on Increasing Awareness

Tools to increase awareness:

1. Newsletters
1. Social Media
1. RSS Feeds
1. Community events (meetups, user groups, etc)
1. Talk to co-workers

In order to increase awareness, most people turn towards social media. From what
I've seen this can be a huge drain on your time if not carefully curated, but
can also be a source of great information. I personally have found a well
curated Twitter list to give me a sufficient amount of information to satisfy my
desire to become aware of new things and old things I hadn't heard of. I've also
heard of people who utilize rss feeds, and started utilizing one myself (I made
sure to have
[an RSS feed for my blog by the way](https://jnielson.com/rss.xml)), and then
there are those who surf hacker news and reddit on the lookout for the hot new
thing or anything they don't know about. Another avenue that people use is to
subscribe to curated newsletters, which are super useful and the people who
curate them are often overlooked relative to how awesome they are!

While striving to increase awareness, it's important to realize that you don't
need to know everything but that simply by being aware of a topic you're more
able to tackle it in the future if you do find a reason to learn about it. For
instance, at my job I don't frequently have to work in languages other than
JavaScript, but I try to have "my ear to the ground" about other languages like
Java in order to be better prepared should I need to utilize that language for
something. To solve that case, I've thrown a couple general technology
newsletters into my rss feed in order to hear about upcoming things and trends
in other circles.

Another way to increase awareness for those who interact with a sufficient
number of developers will be to simply listen. If you hear something you've
never heard of before, write it down if you can't ask about it right then.
Generally, people are more than willing to explain things to those around
them-especially if it's a topic they're passionate about. But, by focusing more
on listening to the conversations you participate in or that surround you it
helps to expand the circle of things you know you don't know (decreasing second
order ignorance by increasing first order ignorance).

Tools to increase awareness:

1. Newsletters
1. Social Media
1. RSS Feeds
1. Community events (meetups, user groups, etc)
1. Talk to co-workers

## Focusing on Increasing Knowledge

Tools to increase knowledge:

1. Having Questions
1. Documentation
1. Source Code
1. Community Resources, especially those monitored by maintainers
   (StackOverflow, Github Issues, etc)
1. Podcasts
1. Books
1. Videos/Blog Posts Tutorials/Explanations/Etc

Alright, so you've heard of something that you don't know much about. How do you
learn more about it? Again, there's a number of approaches that you can take but
be aware that what really matters is why you're trying to learn more. If you're
looking to learn more about something that you work with each day your approach
should be different than something that you're investigating to understand more
about the problems it solves and even different from something that you're
following a tutorial about to get a better grasp for how it compares to things
you already know. Below are some of the tactics that I've found most useful for
increasing knowledge about something, but your mileage may vary. The things that
work for me might not work for you, but they're probably worth a shot.

First, let's tie this back into our Third Order Ignorance that we're focusing
on. If you don't have a process for turning your accrued First Order Ignorance
into Zeroth Order Ignorance, what was the point in becoming aware of the topic
or idea anyway? Frequently I've found that if you are increasing your awareness
about more topics and ideas you could learn about but never actually learning
and reducing how much you know you don't know, it leads to a condition I would
call "Despair from Awareness". It's the point where you're aware of so many
things you don't know that you start to wonder if you really know anything at
all or if you're doing the right thing or if you have been an "imposter" and an
increasing amount of your thoughts start to turn more and more negative. In
order to combat this, I've found that it can be incredibly useful to write down
things you are aware of. As you're writing them down, split them into things you
don't need to know right this minute and things you do. I find using a T Chart
like below helpful:

![T-Chart For gathering thoughts](split.png)

So what qualifies as something that you need to know right now? Ideally this is
a pretty short list, but if you're starting a new role or job it's probably
longer than usual. Things on this list are the first candidates for what to
learn about. But how do you learn about them?

It depends.

### Tackling libraries and language features

Frequently for work, I need to learn about a language feature or library (code
written by others in general too). Some strategies that have helped me:

1. Read the docs!
1. Read the code (or the spec)!
1. Reach out to the community.

Generally libraries become popular and you use them at work to some extent
because they have good documentation. If you're on the bleeding edge you might
find that the docs are lacking, but if you're on the bleeding edge you should
expect to feel some pain. If the docs aren't all that good, you might find some
benefit reading code that utilizes the library or feature if you can find some
in the project you're working on or their sample project.

If you're learning a library, digging into their source code (if it's available)
is a great way to learn more about what the library does and might even help you
realize some thing that you didn't know you didn't know. If you're learning a
new language feature the specification for it is usually pretty detailed and
only sometimes entirely confusing. For JavaScript,
[the EcmaScript spec](https://www.ecma-international.org/ecma-262/10.0/index.html#Title)
is more approachable than I expected it to be when I started working with the
language.

Generally libraries or languages will have a community that you can tap into to
learn more about that through their wikis, blog posts, stackoverflow questions
(and hopefully answers), and tutorials. Frequently the core groups working on
libraries and languages don't have nearly the amount of material you need for
day to day work (although
[the reactjs docs cover a lot of what I use at work](https://reactjs.org/docs/getting-started.html)).
In that case, tapping into the community can be a huge boon to help you learn
more about the different libraries and tools that are available to you. Be aware
that sometimes community resources (and even official ones) can become outdated,
particularly on forums like stackOverflow and reddit, be aware of potentially
outdated information. Also be aware that sometimes things really don't change
for years! Just because an article seems dated doesn't mean that it won't still
work exactly as described.

Some things I've tried that haven't worked super well:

1. Tutorials.
1. Just building it.
1. Asking someone else to tell me about it.

For things I need to know right now or work with on a daily basis, tutorials are
usually too shallow as to the "why does this work" portion of explaining the
concept. There are some good resources out there like
[egghead.io](https://egghead.io), but even then I usually use those more for
exploratory learning (as described later). Similarly, if I try and skip the
knowledge gathering phase when approaching something I need to know to
accomplish a task at hand (aka I need to know it right now) it results in a mess
if I try and build it with knowledge I already have. Generally the time spent
struggling with obscure bugs or hard to understand errors is significantly
lessened by spending some time learning requisite concepts. Sometimes asking
someone that already knows the concept/code/idea to explain it works, but
oftentimes they have other things to work on or have a gap in their knowledge
that forces you to fall back on docs/code/community anyway.

### Tackling other types of knowledge

Infrequently at work I run across other types of things I need to learn, like
organizational processes or how to work better with others. For things like
that, communication is usually the first (and sometimes only) way to learn about
them since they're often not written down anywhere. For improving at soft
skills, the [Soft Skills Engineering Podcast](https://softskills.audio/) is
absolutely fantastic. I've been listening to them for a couple of years now, and
they cover all sorts of topics that you can't find written official docs on!

### Things I don't need to know right now

What if you didn't have anything in your T Chart on the "need to know now" side
(which I hope is the case for you)? Well, then you get to pick something! It's
important to always be learning and improving, otherwise you're likely to hit
the point where the list of things you need to know right now is too long to
tackle (and you'd probably need to redo your T Chart with a more specific time
unit, like "things I need to know this hour" or something). When learning things
I don't need to know right now, I tend to take a vastly different approach from
things I need to know right now. Usually I'll spend more time focused on
understanding the broad overview of the topic/library/idea and less time in the
immediately applicable stuff like docs/code/specs. I find this helps me to have
a better overview of where docs/code/specs can be used when I do need to know
the thing right now, but still increases my ability to conversationally discuss
the topic. When learning things I don't need to know right now I'm also more
likely to find and work through a tutorial or two (if it's a code related thing)
to build something basic with it and get a feel for the different features that
are offered.

### General tips

An important aspect of all knowledge gathering is asking the right question.
When you first become aware of something that you don't know, the questions you
ask are generally pretty broad and basic. Things like:

- What is the point of this?
- How does this work?
- Who is using it?
- How is this different than xyz?
- What drawbacks are there?

Once you start getting answers to these questions (and others) you'll either
want to learn more about specific aspects and expand your knowledge deeper.
Sometimes it's useful to evaluate if you're focusing too narrowly on the topic
at hand and broaden your view by becoming aware of related things.

On the other hand, if you're working with something you'll occasionally bump
into walls that nobody around you knows the answer to. An example of this is one
time I was working on figuring out why our internal component library was
causing className mismatch errors when used in a next.js environment and nobody
that I asked had any ideas. When I searched around the internet all the issues
about it were closed, indicating that they had been fixed through xyz
configuration change. Eventually I learned that our component library needed to
utilize the styled-components babel-plugin in order to safely be used in a
next.js environment (which was our primary target environment). This realization
came through reading docs, reading code, perusing open and closed issues on the
github projects, and a lot of refining what question I was asking.

Another general tip that I've found helpful is to recognize when you don't need
to know something. For instance, in college we had to take a Computer Networking
class that was an overview of the entire networking stack. The nice thing about
it, was that they provided the things we didn't need to know in a nice manner.
The class wasn't focused on HTML/CSS/etc, so they provided that to us and helped
us to focus on the thing we needed to know then. Sometimes it's useful to let an
abstraction layer be an abstraction and not worry about how it works or what it
does as long as you know how to utilize the benefit it provides.

Tools to increase knowledge:

1. Having Questions
1. Documentation
1. Source Code
1. Community Resources, especially those monitored by maintainers
   (StackOverflow, Github Issues, etc)
1. Podcasts
1. Books
1. Videos/Blog Posts Tutorials/Explainations/Etc

Once you've got a pretty good grasp on the basics of something, generally you'll
want to continue learning more about it. But sometimes it's useful to take a
step back and optimize.

## Focusing on Increasing Speed

Tools to increase speed:

1. Repetition/Familiarity
1. Pair Programming
1. Deliberate Practice
1. Focused Attention

I personally don't focus on increasing speed all that often. Generally I
oscillate back and forth between increasing awareness and knowledge, but when I
do focus on speed there's a couple aspects of it that I focus on:

- Speed to accomplish a task
- Speed to fill in a gap in my knowledge
- Speed to determine the cause of an error

Increasing how fast I'm able to accomplish a task, fill in a gap in my
knowledge, or determine the cause of an error all yield huge dividends over time
but generally aren't required in order to plug along with the work that's
required of me. In order to increase my speed a large portion of it comes from
familiarity. As I'm more familiar with docs/code/community resources I'm able to
find information to fill in gaps. In order to increase my speed with
accomplishing tasks, I have to be familiar with the tools I'm using or they'll
slow me down as I'm constantly having gaps in my knowledge to fill in.

I don't know how many of you have seen the React error screen before, but I'm
pretty familiar with it now:

![React Error Screen](/assets/blog/sharpen-your-axe/react-error.png)

Increasing how fast I can determine the cause of an error is something that I've
found varies based on how familiar I am with the code I'm writing or working
with. If I'm super familiar with the project, I can usually deduce what is going
on plenty fast. For example, even though the actual message here isn't what is
missing (the closing div tag is below) since I'm familiar with this error I can
tell that I'm actually missing an opening `<label>` tag. On the flip side, in a
new project I usually have to take 5-10 times as long to determine causes of
errors since there are so many things I don't know about it. In either case,
errors in a lot of projects have great messages or useful stack traces and I
skip over them thinking I know the answer to the issue (which is usually the
opposite of the truth). If I actually take the time to **READ THE ERROR** 9/10
times that points straight to the issue. If I'm not familiar enough with the
project it might point me there, but I still don't always know how to fix it...
In that case I probably need to go back and focus on increasing knowledge and
take a step back from increasing speed.

Other things that I've found to increase my speed overall is to work with
someone else in pair programming. There's a lot of resources out there on pair
programming, but the thing that I find most beneficial about it is the
capability to see how someone else is working and learning more things that I
didn't know I don't know. For instance, I recently pair programmed with someone
who used vim and showed me how to use vim macros. After seeing how he did that,
I learned some basics on my own, and have since used a number of macros. Later
on, I pair programmed with him again, and he showed me a couple neat tricks to
get faster at them!

Something else that I've found helpful when increasing speed is to deliberately
practice something. When I was learning to type, I wasn't all that fast, but
once I decided that I was going to work on software and computers for my career,
I realized that I should probably spend some time increasing the speed with
which I type. I found a resource online, and practiced regularly and saw some
notable speed improvements (I did eventually fall out of that habit).

Another approach I use to increase my speed at something is to give it focused
attention. I've found that if I don't focus on the task I tend to go slower, but
also make more mistakes and overall perform worse. But, the biggest benefit of
focused attention is that I'm able to more clearly notice the things that can be
improved. For instance, the last time I prepared a presentation I tried to focus
on it and as a result noticed that spending time writing more of my thoughts
down would help improve how cohesive my presentation would have been.

Tools to increase speed:

1. Repetition/Familiarity
1. Pair Programming
1. Deliberate Practice
1. Focused Attention

## Focusing on Increasing Communication

Tools to increase communication:

1. Write a blog post
1. Improve the documentation
1. Answer questions on StackOverflow/Github Issues
1. Share what you learn

Another approach that you can take when you have learned about something, is to
increase your communication on the topic. This is actually something that I'm
working on right now by writing this post as something that can be shared
instead of just making an outline and internal slide deck for the presentation
(which is what I've done in the past for work presentations). My hope with
writing this out was to make the presentation better, but also increase my
capability to communicate about the topic in other ways. I personally find the
topic of learning fascinating, and wish there were more resources out there that
discussed it from a personal perspective-since it is a deeply personal thing.

Anyway, the idea with this approach is to share the knowledge that you've gained
(communicate it to others) to help make it stick. There was a
[recent blog post by Kent Dodds](https://kentcdodds.com/blog/how-i-teach) that
talked about the importance of teaching and sharing what you're learning.
Another common thing is to
[Learn in Public](https://twitter.com/swyx/status/1009174159690264579),
something I wish I did more of since I've seen how much I've benefitted from
those who do.

Something that I should do more of, is improve documentation after I learn
something. Sometimes I'll go through the docs for something and notice an error,
find what lead to it (usually a recent change that wasn't documented), and then
apply that solution to my task but never go back and add that solution to the
documentation. This would make it easier for others, but also makes it easier
for me the next time I come across the issue.

Another thing that you can do to communicate about something you learned is go
answer questions other people have! StackOverflow and Github Issues both make
this really easy to get started doing, and the maintainers of projects almost
always appreciate the help tackling the amount of questions and issues they see.
Another benefit of this is that you'll frequently come across things that you
didn't know you didn't know (I've definitely mentioned that in other places
too), and so you're able to find knowledge using whatever approach works best
for you and share it.

The key idea here, is that it doesn't really matter how you communicate the
ideas, but increasing the amount you communicate about them will help you learn
more about them. As you're talking/blogging/sharing you generally come across
more things that you didn't know you don't know, as well as answers to things
you were aware you didn't know. In either case, there is a wide array of other
material out there that talks about communicating what you learn (and I linked
above to two of my favorites).

An important caveat to mention with communication, is the importance of having
it be searchable. While gathering knowledge is cool and all, our brains can only
hold so much and so the benefit of being able to find information later (through
searching google/github/other places) is huge! One of the biggest benefits to
written communication is how easily computers let us search it. For instance, if
you don't remember the tools I've mentioned throughout this article, you can
just search the page with your browser and you'll get a number of results (I've
also compiled it into a list at the end).

Tools to increase communication

1. Write a blog post
1. Improve the documentation
1. Answer questions on StackOverflow/Github Issues
1. Share what you learn

## Recap

Over your career you'll hopefully learn a lot of things that you didn't know
when you started. Share them! Use them! I hope that the approaches and process I
described here can help you work to create your own process to learn to fish and
sharpen your own axe.

### Tools to Increase Awareness

1. Newsletters
1. Social Media
1. RSS Feeds
1. Community events (meetups, user groups, etc)
1. Talk to co-workers

### Tools to Increase Knowledge

1. Having Questions
1. Documentation
1. Source Code
1. Community Resources, especially those monitored by maintainers
   (StackOverflow, Github Issues, etc)
1. Podcasts
1. Books
1. Videos/Blog Posts Tutorials/Explanations/Etc

### Tools to Increase Speed

1. Repetition/Familiarity
1. Pair Programming
1. Deliberate Practice
1. Focused Attention

### Tools to Increase Communication

1. Write a blog post
1. Improve the documentation
1. Answer questions on StackOverflow/Github Issues
1. Share what you learn

Thanks for reading! If you have comments or other ideas of things that I could
expound more on, feel free to tweet at me (or DM me if you're more comfortable
with that). In my presentation I'll utilize some live coding examples
throughout, as well as work through some docs for examples.

_Banner image courtesy of undraw.co_
