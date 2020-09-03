<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="classId"
          :items="classes"
          label="Classes"
        ></v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="6">
        <v-btn text color="primary" outlined @click="getTimetable">Submit</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>

<v-row align="center">
      <v-col class="d-flex" cols="12" sm="2">
        <v-select
          v-model="selectedElement.day"
          :items="days"
          label="Days"
        ></v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="2">
        <v-select
          v-model="selectedElement.class"
          :items="classes"
          label="Classes"
        ></v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="2">
        <v-select
          v-model="selectedElement.subject"
          :items="subjects"
          label="Subjects"
        ></v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="2">
        <v-btn text color="primary" outlined @click="getTeachers">Submit</v-btn>
      </v-col>

      <v-col class="d-flex" cols="12" sm="2">
        <v-btn text color="primary" outlined @click="getTeachers">Clear</v-btn>
      </v-col>
    </v-row>

<v-row align="center">
<v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Teacher Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in teacherList" :key="item">
          <td>{{ item }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-row>


  </v-container>
</template>

<script>
import axios from 'axios';
import json from '../assets/teachers.json'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        headers: [
          {
            text: 'Day / Period',
            align: 'start',
            sortable: false,
            value: 'day',
          },
          { text: '1st', value: 'first' },
          { text: '2nd', value: 'second' },
          { text: '3rd', value: 'third' },
          { text: '4th', value: 'fourth' },
          { text: '5th', value: 'fifth' },
        ],
        desserts: [],
        classId: '',
        classes:['1A','1B','1C','1D','1E'],
        subjects:["2LK","CK","CH","CH/K","3LH/K","Eng"],
        teachersJson:json,
        teachers:{},
        days:['Monday','Tuesday','Wednesday','Thursday','Friday'],
        selectedElement:{
          day:null,
          class:null,
          subject:null

        },
        teacherList:[]
      }
    },
    mounted(){
      for(var k in this.teachersJson) this.teachers[k] = true
      console.log(this.teachers)
    },
    methods:{
      getTimetable: function(){
        axios.get('http://127.0.0.1:3000/timetable',{
          params: {
            classId: this.classId
          }
        }).then((response) => {
          // console.log(response.data)
          this.desserts = response.data
        })
        // console.log(this.classId)
      },
      getTeachers(){
        this.reset()
        console.log(this.selectedElement)
        if(this.selectedElement.class){
          for(let teacher in this.teachersJson){
            if(!this.teachersJson[teacher].classList.includes(this.selectedElement.class)){
              this.teachers[teacher] = false
            }
          }
        }
        // if(this.selectedElement.subject){
        //   for(var teacher in this.teachersJson){
        //     if(!this.teachersJson[teacher].subjects.includes(this.selectedElement.subject)){
        //       this.teachers[teacher] = false
        //     }
        //   }
        // }

        if(this.selectedElement.subject){
          for(let teacher in this.teachersJson){
            if(!this.teachersJson[teacher].subjects.includes(this.selectedElement.subject)){
              this.teachers[teacher] = false
            }
          }
        }
        for(var k in this.teachers){
          if(this.teachers[k]){
            this.teacherList.push(k)
          }
        }
        console.log(this.teacherList)
      },
      clear(){
        this.selectedElement = {
          day:null,
          class:null,
          subject:null

        }
        this.teacherList = []
        for(var k in this.teachersJson) this.teachers[k] = true
      },
      reset(){
        this.teacherList = []
        for(var k in this.teachersJson) this.teachers[k] = true
      }

    }
  }
</script>
