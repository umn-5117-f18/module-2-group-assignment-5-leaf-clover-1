<template>
  <div id="app">
    <header>
      <div id="nav">
        <router-link to="/master-resume">Master Resume</router-link>
      </div>
    </header>

    <h1>app.ly</h1>
    <h2>Organize your job applications - get your dream job</h2>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
