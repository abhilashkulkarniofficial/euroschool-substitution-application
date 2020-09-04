<template>
  <v-container fluid>
    <!-- <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="classId"
          :items="classes"
          label="Classes"
        ></v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="6">
        <v-btn text color="primary" outlined>Submit</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table> -->

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
        <v-btn text color="primary" outlined @click="clear">Clear</v-btn>
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
        classes:['1A','1B','1C','1D','1E','2A','2B','2C','2D','2E','2F'],
        subjects:["Kannada II L","Compulsory Kannada","Compulsory Hindi","English","Maths","Science","Social Studies","ICT"],
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
      async getTeachers(){
        console.log('sent request')
        let result = await axios.get('http://127.0.0.1:3000/teachers', {params:{
          classId:this.selectedElement.class,
          subject:this.selectedElement.subject
        }})
        this.teacherList = result.data
        console.log(result)
      },
      clear(){
        this.selectedElement = {
          day:null,
          class:null,
          subject:null
        }
        this.teacherList = []
      }

    }
  }
</script>
