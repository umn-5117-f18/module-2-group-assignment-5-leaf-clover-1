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
    <router-view/>
    <Footer/>
  </div>
</template>