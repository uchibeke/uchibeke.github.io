# Portfolio Website

This is a portfolio website I made. It is serverless.  Could spin up a nodejs server 
but thought it will be easier to just use static files. Anyone can easily edit the
json that holds project info and move images around to have a copy of this portfolio.

## Add new Project

### Project text

Project details are in the `./js/projects/projects.json` file. Modify the file 
by entering new project or deleting any project you do not need.

```
 {
        "title": "Madeincanada",
        "intro": "I started madeincanada.design to bring projects I worked on here in Canada to Africa where I am originally from. My work is a sum of all my experiences and it's always satisfying to share what I do with people in Canada and in Africa.",
        "summary": "I believe that Canada has a lot to offer to the world. Some of the world's brightest mind studied here and Canada is still training top talent. With madeincanada, my aim is to sell the skills I have gained while studying in Canada to Africa with a view of encouraging other prospective international students to chose Canada.",
        "role": "I worked on this 100%. It's a continuous project I will keep updating and playing with.",
        "exec": "I designed a rest api backend service for madeincanada. This allows me to use the same endpoint for all the stuff I build under madeincanada. A microservices architecture also allows me to change the backend without needing to change anything in the frontend.",
        "challenge": "So far, I have been able to complete two components of madeincanada. The 'People' feature is a exclusize league if newly wed Nigerian couples who have done outstandingly in their chosen profession. The 'wedding' product offers custom wedding invitations designed by the couple on madeincanada weddings.",
        "result": "Finished madeincanada Weddings and madeincanada people.",
        "url": "http://madeincanada.design",
        "pathToAssets": "images/portfolio/madeincanada"
    }
```



### Project images

Project images are stored in `images/portfolio`. The name of the image directory
directory of each project should be specified in the `./js/projects/projects.json` 
file. You can actually store images for your project in any directory as far as you specify it here.

```
 {
        "pathToAssets": "images/portfolio/madeincanada"
    }
```
NB: A `home.png` and `main.png` images must be in the image directory for each project.

## Customizing Details
