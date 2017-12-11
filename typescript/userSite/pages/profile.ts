/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

class Profile {
    profile() {
        this.parallax();
        this.follow();
    }
    
    parallax() {
        var parallax = new Parallax();
        
        parallax.parallaxHeaderUser();
        parallax.parallaxImg();
        parallax.parallaxName();
    }

    follow() {
        var follow = new Follow();

        $('#userHeader').on('click', '#followUser', follow.followUser);
        $('#userHeader').on('click', '#unfollowUser', follow.unfollowUser);
    }
}

