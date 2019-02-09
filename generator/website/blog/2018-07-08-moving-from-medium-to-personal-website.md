---
title: I moved my medium posts to my static site and it was easy
author: Uchi Uchibeke
authorURL: https://uchi.uchibeke.com
authorFBID: 100006518800911
---

This post is going to be simple and straight to the point. I must also warn that
it is technical. If you follow the instructions, the steps are detailed enough
to allow anyone who’s familiar with `nodejs` to follow it.

![](https://cdn-images-1.medium.com/max/1600/1*A0H1vg6H25Dk4rj03idmQA.jpeg)
<span class="figcaption_hack">Photo by [Mpumelelo
Macu](https://unsplash.com/photos/l_YNobbDYJk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
on
[Unsplash](https://unsplash.com/search/photos/surprised?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)</span>

<!--truncate-->

### Setting up

- Install NodeJS and Yarn/NPM
- Docusaurus: Create a new folder `blog` and `cd` to the folder and run `npx docusaurus-init`
- Some files will be generated
- Rename`docs-examples-from-docusaurus` to `docs`
- `cd website`
- Rename `blog-examples-from-docusaurus` to `blog`
- Run the local webserver via `yarn start` or `npm start`

The webpage will open on your browser. It’s now time to customize your blog and
move your blog posts from medium to your blog.

### Customizing

- Create an `index.html` file in `website/static/` and copy and paste the code
  below in it and restart your webserver via `yarn start` or `npm start` .

      <!DOCTYPE HTML>
      <html lang="en-US">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="refresh" content="0; url=blog/">
          <script type="text/javascript">
            window.location.href = 'blog/';
          </script>
          <title>Title of Your Blog</title>
        </head>
        <body>
          If you are not redirected automatically, follow this <a href="blog/">link</a>.
        </body>
      </html>

- Notice that the webpage opens up with the default blog posts

> **Congratulations on completing the hard part. You only need to do the above
> once.**

![](https://cdn-images-1.medium.com/max/2000/1*Z73tSRaT30rnRh7rzS__lA.png)
<span class="figcaption_hack">[Lush Plans’s Blog ](https://lushplans.com/blog/)converted from medium posts</span>

### Moving a medium post to your static blog

- Install the chrome extension [Convert Medium Posts to
  Markdown](https://chrome.google.com/webstore/detail/convert-medium-posts-to-m/aelnflnmpbjgipamcogpdoppjbebnjea?hl=en)
- Create a new file markdown (.md) in `website/blog` directory. The filename must
  be in the format `YY-MM-DD-my-post-title.md`. The date part is important. Th
  title does not matter. The date should ideally be the date you published your
  medium post.
- Copy and paste the following on top of the file:

  ***

  title: We failed at starting a Business and it was depressing

  author: Uchi Uchibeke

  authorURL: https://lushplans.com/about.html

  authorImageURL: https://lushplans.com/img/team/uchi.png

  ***

The title should be the title of your medium post

<p align="center">
  <img src="https://cdn-images-1.medium.com/max/1200/1*HpUg8CNadeR0S_EF9dAxcw.png" width="49%" />
  <br>
</p>

- Next, using chrome, open the medium post you want to move over. Make sure to
  scroll to the bottom to ensure all images are loaded.
- Once the medium post is open, click on the Convert To Markdown chrome extension
  icon. A popup will open containing your medium post in markdown format.
- Copy the markdown text from the popup
- Go back to the `YY-MM-DD-my-post-title.md` file and paste the text.
- Delete the first line (post title)of the posted content
- Delete all the lines at the bottom after the end of your post
- Save file and restart server
- That’s it. You’re done.
- Maybe delete the default files that came with the template
- To add more medium posts, do the same things you’ve done starting at the
  beginning of this section

### Static HTML generation and deployment

- Run `yarn build` or `npm run build` to create an optimized version of your blog
  posts
- Move the contents of `build/test-site` to the `blog` directory on your website.
- Push to your web host like you would normally do
- Visiting `YourWebsite.com/blog` will take you to all the medium posts you added

### Customization

For next time, I will be writing about customizing your blog, changing the
footer, header and icons and, adding meta tags and other SEO stuff.

One more thing: Notice that `YourWebsite.com/blog` shows the full post. We
probably want to show a truncated summary. To do that:

- In the `YY-MM-DD-my-post-title.md` file, add `<!--truncate-->` on the line you
  want the post to be truncated on

Please, leave your questions below until next time.

---
