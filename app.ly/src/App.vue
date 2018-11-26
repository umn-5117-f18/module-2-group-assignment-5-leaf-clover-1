<template>
  <div id="app">
    <header>
      <div id="nav">
        <router-link to="/">Home</router-link> 
        |
        <router-link to="/master-resume">Master Resume</router-link>
        |
        <router-link to="/applications">Applications</router-link>
      </div>
    </header>

    <h1>app.ly</h1>
    <h2>Organize your job applications - get your dream job</h2>
    <router-view/>
    <Footer/>
  </div>
</template>