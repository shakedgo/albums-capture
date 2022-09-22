## How to run :

1.  First install npm packages:

```
npm install
```

2. Now we Need to install the modules from inside the client and server.\
   run this command (This might take a while - it's react after all...)

```
npm run installs
```

3. Finally, we cant start the project:

```
npm start
```

---

## How to Deploy :

1. Run step 2 from "How to run" if you haven't already.
2. Run this command to deploy:

```
npm run deploy
```

3. Go to deploy folder and initialize git:

```
cd deploy && git init
```

4. Login to heroku: (In case you didn't do it earlier)

```
heroku login
```

5. Create heroku project: (In case you didn't do it earlier)

```
heroku create <project-name>
```

6. Create heroku remote: (Replace `<project-name>` with name of your project)

```
heroku git:remote -a <project-name>
```

7. Commit last changes: (Replace `"My new commit"` with your message)

```
git add -A
git commit -m "My new commit"
```

8. Push changes:

```
git push heroku master -f
```
