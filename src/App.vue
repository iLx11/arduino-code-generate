<template>
  <router-view/>
</template>

<style lang="scss">
@font-face {
  font-family: 'ceyy';
  src: url('./assets/font/ceyy.ttf');
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: "ceyy";
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a,
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
a, 
a:visited,
a:hover,
a:active,
a:link {
  text-decoration: none;
  color: #000;
}

li {
  list-style-type: none;
}

body,
html {
  width: 100%;
  height: 100%;
}

</style>
