## Joker Stream Website

**This is a project I started in 2014 to practice, it was started without using Git, and since 2017 I stopped working on it going back in 2021, so it needs a lot of improvements.**

**This is an unfinished project, A lot of parts are unfinished and do not work properly. Use the install page to install the database.**

### IMPORTANT

**The videos folder ("media/movies" and 'media/series) are both untracked due to its size. They will be created after the first addition. The script to create the videos does not work properly, so you can make them by yourself to test purposes.**

### Improvements

- [ ] Change translation from database to gettext.
- [ ] Update NPM to Yarn.
- [ ] Fix Gulp tasks, possibly changing from another one.
- [ ] Update the addition script.
- [ ] Update password hash generation for a more secure one.
- [ ] Fix showing content when there is no content to show.
- [ ] Update Install page to identify if the database is already installed.

## Gulp tasks


- Use the **prod** task on marster branch only, this is to comlite **TS/SASS** to **JS/CSS**.

- The **dep** task is to update the components using **NPM**.

- The **sass** task is to compile the **SASS** to **CSS**, adding the sourcemaps

- The **ts** task is to compile **TS** to unminified **JS**

- The **tswatch** and **sasswatch** tasks run both **ts** and **sass** tasks after a file is changed

- The **tsmin** and **sassmin** tasks compile the **TS** and **SASS** minified.

- If you desire, you can use the **sync** task to auto-reload the browser after a change.

- Customize the **default** tasks to run all tasks you want with only a command.