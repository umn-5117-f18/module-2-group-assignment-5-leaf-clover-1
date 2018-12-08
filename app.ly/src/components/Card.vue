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
                    <a v-on:click="deleteCard" class="card-footer-item">
                        Delete
                    </a>
                </footer>
         </div>
    </div>
</template>

<script>
import { db } from '@/main.js'

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
    },
    methods: {
        deleteCard() {
            var UID = 'user1';
            var docRef = db.doc('users/' + UID);
            var apps = [];
            var mr = [];
            var total = 0;

            docRef.get().then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    // store current state of applications map
                    var data = documentSnapshot.data();
                    apps = data.applications;
                    mr = data.master_resume;
                    total = data.total_apps;

                    console.log('deleting app: ', this.name);

                    // delete property from JSON object
                    delete apps[this.name];

                    docRef.set({ applications: apps, master_resume: mr, total_apps: total })
                    console.log('updated database');
                } else {
                    console.log('document not found');
                }
            });
        }
    }
}
</script>
