<template>
    <div class="container my-5">
        <div class="text-center">
            <h1 class="display-4 text-center mb-3">Making API calls in Vue</h1>
            <div class="center">
                <div class="row">

                    <div class="col-lg-6">
                        <button v-on:click="onGet" class="btn btn-primary my-3">GET</button>
                        <button v-on:click="onSimultaneous" class="btn btn-info">Concurrent requests</button>
                        <button v-on:click = "onError" class="btn btn-danger"> Error Handling </button>
                    </div>
                    <!-- POST -->
                    <div class="col-lg-6">
                        <h2>Post</h2>
                        <form @submit.prevent="onPost">
                            <div class="form-group">
                                <label>Title</label>
                                <input type="text" class="form-control" v-model="title" required />
                            </div>
                            <div class="form-group">
                                <label></label>
                                <textarea class="form-control" v-model="body" required></textarea>
                            </div>
                            <div class="mt-3">
                                <button type="submit" class="btn btn-primary">
                                    Create Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <hr />

            </div>
        </div>
        <hr />
        <div>
            {{ res }}
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import axiosInstance from './services/axiosInstance'
export default {

    data() {
        return {
            res: [],
            title: '',
            body: ''
        };
    },
    name: 'App',
    methods: {

        onGet() {
            axios
                .get("https://jsonplaceholder.typicode.com/todos", {
                    params: {
                        _limit: 5
                    },
                })
                .then((response) => {
                    console.log(response)
                    this.res = JSON.stringify(response.data)
                })
                .catch((errors) => {
                    console.log(errors)
                })
        },

        onPost() {
            axios
                .post('posts.json', {
                    title: this.title,
                    body: this.body,
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'KrvLC6sUgU'
                        }
                    })
                .then(response => {
                    console.log(response)
                    this.res = "Status " + response.status + " Post created";
                })
                .catch(err => console.error(err));
        },

        onError() {
            axiosInstance
                .get('todoss', {
                })
                .then(response => console.log(response))
                .catch(err => {
                    if (err.response) {
                        // Server responded with a status other than 200 range
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                        if (err.response.status === 404) {
                            alert('Error: Page Not Found');
                        }
                    } else if (err.request) {
                        // Request was made but no response
                        console.error(err.request);
                    } else {
                        console.error(err.message);
                    }
                });
        },

        onSimultaneous() {

            let one = "https://jsonplaceholder.typicode.com/posts?_limit=1"
            let two = "https://jsonplaceholder.typicode.com/todos?_limit=1"

            const requestOne = axios.get(one);
            const requestTwo = axios.get(two);

            axios
                .all([requestOne, requestTwo])
                .then(
                    axios.spread((...responses) => {
                        const responseOne = responses[0];
                        const responseTwo = responses[1];
                        console.log(responseOne)
                        console.log(responseTwo)
                        this.res[0] = responseOne.data
                        this.res[1] = responseTwo.data
                        console.log(this.res)
                    })
                )
                .catch(errors => {
                    // react on errors.
                    console.error(errors);
                });
        }
    },
};
</script>

<style scoped>
center {
    display: flex;
    justify-content: center;
}
</style>
