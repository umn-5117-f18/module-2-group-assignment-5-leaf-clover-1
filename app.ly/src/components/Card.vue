<template>
    <div class="column ">
        <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Component
                    </p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                        <span class="icon">
                             <Calendar/>
                        </span>
                    </a>
                </header>
                <div class="card-content">
                    <div class="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                        <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                        <br>
                        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    </div>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item">Save</a>
                    <a href="#" class="card-footer-item">Edit</a>
                    <a href="#" class="card-footer-item">Delete</a>
                </footer>
         </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'card',
  components: {
    Calendar
  }
}
</script>