# Things to remember

- It's a good practice to keep the backend interaction in a particular file [appwrite](./src/appwrite/) for this project. So even when we shift the backend from other backend service we don't have to change frontend too much
- When we create project using `create react` we can access the env variable name as `process.env` but when we create a project using `create vite` the env variable is access using `import.meta.env`
- Also when we create a project using `create react` the env variable name should start with `REACT_APP_<variablename>` and when we create a project we should use `VITE_<variablename>`
- [RTE.jsx](./src//components/RTE.jsx) in this file we have created the text editor which was required (also called Riched text editor) more information is included in file in comment tags
- Somethings about [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) and comman js behaviour is written inside [PostForm.jsx](./src/components//PostForm/PostForm.jsx)

## To improve

- Add loading screen in [App.jsx](./src/App.jsx) (and at few more place) for better experince.
- Add theme swticher in the project
- Add show and hide password option
