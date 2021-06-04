## Joker Stream Website

**This is a project I started in 2014 to practice, it was started without using Git and I stop working on it in 2017. Going back now, maybe changing the purpose of it.**

**This is an unfinished project, A lot of parts are unfinished and do not work properly, I keep the code here because I spent too much time on it and the code can help someone else, including myself.**

### IMPORTANT

**The vídeos folder ("media/movies" and 'media/series) are both untracked due to its size. They will be created after the first addition.**


## Gulp tasks


- Use the **prod** task on marster branch only, this is to comlite **TS/SASS** to **JS/CSS**.

- The **dep** task is to update the components using **NPM**.

- The **sass** task is to compile the **SASS** to **CSS**, adding the sourcemaps

- The **ts** task is to compile **TS** to unminified **JS**

- The **tswatch** and **sasswatch** tasks run both **ts** and **sass** tasks after a file is changed

- The **tsmin** and **sassmin** tasks compile the **TS** and **SASS** minified.

- If you desire, you can use the **sync** task to auto-reload the browser after a change.

- Customize the **default** tasks to run all tasks you want with only a command.