<template>
    <div class="column ">
        <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        {{ title }}
                    </p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                        <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </a>
                </header>
                <div class="card-content">
                    <div class="content">
                        {{ descript }}
                        <br>
                        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    </div>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item">Save</a>
                    <router-link :to="appPath" class="card-footer-item">
                        Edit
                    </router-link>
                    <a href="#" class="card-footer-item">Delete</a>
                </footer>
         </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        name: String,
        title: String,
        descript: String
    },
    computed:{
        appPath() {
            return '/app/' + this.name;
        }
    }
}
</script>
