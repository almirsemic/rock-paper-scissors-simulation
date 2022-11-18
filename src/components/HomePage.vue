<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="w-75 h-75">
        <div class="row p-4 text-center">
          <div class="col-sm-12">
            <h5 class="text-warning fs-1 fw-bold">WHAWHAI</h5>
          </div>
        </div>
        <div class="row justify-content-center align-items-end mt-5">
          <div class="col-md-3 col-sm-4 text-sm-start text-center p-4">
            <router-link to="/warriors"><img :src="require('../assets/avatar_' + imagePath + '.jpg')"
                class="rounded-circle" :class="{ select_player: imagePath == 'unknown' }"></router-link>
          </div>
          <div class="col-md-5 col-sm-7 p-4">
            <input type="text" v-model="name" class="form-control bg-transparent rounded-0 text-warning shadow-none"
              placeholder="$WARRIOR-NAME" spellcheck="false">
          </div>
        </div>
        <div class="row justify-content-center">
          <div class=" col-md-8 p-4">
            <b-form-select v-model="roundOne" :options="setRound"
              class="form-select border-0 rounded-0 shadow-none round_one">
              <template slot="first">
                <option :value="null" disabled>Attack For Round #1</option>
              </template>
            </b-form-select>
            <b-form-select v-model="roundTwo" :options="setRound"
              class="form-select border-0 rounded-0 shadow-none round_two">
              <template slot="first">
                <option :value="null" disabled>Attack For Round #2</option>
              </template>
            </b-form-select>
            <b-form-select v-model="roundThree" :options="setRound"
              class="form-select border-0 rounded-0 shadow-none round_three">
              <template slot="first">
                <option :value="null" disabled>Attack For Round #3</option>
              </template>
            </b-form-select>
          </div>
        </div>
        <div class="row p-4">
          <div class="text-center">
            <button class="btn btn-warning px-4 text-danger fw-bold" @click="manualValidation">FIGHT !!!</button>
          </div>
        </div>
      </div>
      <b-modal id="modal-1" title="Error" header-class="error" content-class="content" hide-footer>
        <p class="my-4 fw-bold text-danger">Invalid Application !!!</p>
        <p class="my-4 fw-bold text-danger">{{ errorMessage }}</p>
      </b-modal>
    </div>
  </template>
  <script>
  import axios from 'axios'
  function setAttacks(str1, str2, str3) {
    return [
      { value: 0, text: str1 },
      { value: 1, text: str2 },
      { value: 2, text: str3 }
    ]
  }
  export default {
    data() {
      return {
        name: '',
        errorMessage: '',
        roundOne: null,
        roundTwo: null,
        roundThree: null,
        imagePath: 'unknown'
      }
    },
    computed: {
      warriorType() {
        switch (this.imagePath) {
          case 'marvin':
            return 0
          case 'dragon':
            return 1
          case 'tesla':
            return 2
          case 'hackerman':
            return 3
          case 'unicorn':
            return 4
          default:
            return undefined
        }
      },
      setRound() {
        switch (this.imagePath) {
          case 'marvin':
            return setAttacks('Depression #1', 'Depression #2', 'Depression #3')
          case 'dragon':
            return setAttacks('Fire-Spitting', 'Dragon-Claw', 'Pound')
          case 'tesla':
            return setAttacks('Shaker-Machine', 'AC voltage', 'Radio Waves')
          case 'hackerman':
            return setAttacks('Cyber', 'System32 Error', 'Norton Antivirus')
          case 'unicorn':
            return setAttacks('Rainbowshit', 'Candypuke', 'Cornlove')
          default:
            return []
        }
      }
    },
    methods: {
      manualValidation() {
        if (this.imagePath == 'unknown') {
          this.errorMessage = "Please choose a warrior."
          this.$bvModal.show("modal-1")
        } else if (this.name == '' || this.name.length > 25) {
          this.errorMessage = "The name must be between 1 and 25 characters."
          this.$bvModal.show("modal-1")
        } else if (this.roundOne == null) {
          this.errorMessage = "Please select attack for the first round."
          this.$bvModal.show("modal-1")
        } else if (this.roundTwo == null) {
          this.errorMessage = "Please select attack for the second round."
          this.$bvModal.show("modal-1")
        } else if (this.roundThree == null) {
          this.errorMessage = "Please select attack for the third round."
          this.$bvModal.show("modal-1")
        } else {
          this.fight()
        }
      },
      async fight() {
        try {
          const REGISTER = await axios.post("", {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "Register",
            "params": {
              "Application": {
                "name": this.name,
                "warriorType": this.warriorType,
                "attacks": [this.roundOne, this.roundTwo, this.roundThree]
              }
            }
          })
          localStorage.setItem("id", REGISTER.data.result.id)
          localStorage.setItem("name", this.name)
          this.$router.replace("/fight")
        } catch (error) {
          console.error(error)
        }
      }
    },
    created() {
      if (localStorage.getItem("selectedWarrior")) {
        this.imagePath = localStorage.getItem("selectedWarrior")
      }
    }
  }
  </script>
  <style scoped>
  .round_one {
    background-color: #F8EFC1;
  }
  
  .round_two {
    background-color: #F2E98B;
  }
  
  .round_three {
    background-color: #FFDF59;
  }
  
  .select_player {
    border: 2px solid black;
    background: white;
  }
  
  input {
    font-weight: 700;
    border: 0;
    border-bottom: 2px solid #FFDF59;
  }
  
  input::placeholder {
    color: #FFDF59;
  }
  
  input[type='text'] {
    font-size: 24px;
    font-family: monospace;
  }
  </style>
    
  