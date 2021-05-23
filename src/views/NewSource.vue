<template>
  <div class="home">
    <v-app>
      <v-stepper alt-labels>
        <v-stepper-header>
          <v-stepper-step :complete="stepCompleted[0]" :step="1">
            Etape 1
          </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="stepCompleted[1]" step="2">
          Etape 2
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="stepCompleted[2]" step="3">
          Etape 3
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>
    <v-btn color="success" @click="onDashboard">Tableau de bord</v-btn>

    <Step1 v-if="actualStep == 1" @setValid1="setValid1($event)"
    :inputFormat= "step1.inputFormat"></Step1>
    <Step2 v-else-if="actualStep == 2"></Step2>
    <Step3 v-else-if="actualStep == 3"></Step3>




    <v-footer
      color="primary lighten-1"
      padless
    >
    <div v-if="actualStep!=1">
      <v-btn color="success" @click="onPreviousStep">Précédent</v-btn>
    </div>
    <div v-if="actualStep!=3">
      <v-btn color="success" @click="onNextStep" :disabled="isButtonNextStepDisabled">Suivant</v-btn>
    </div>
    <div v-else>
      <v-btn color="success" @click="onFinish">Terminer</v-btn>
    </div>
    
    
  </v-footer>
    </v-app>
  </div>
</template>

<script>
import Step1 from "@/components/Step1.vue"
import Step2 from "@/components/Step2.vue"
import Step3 from "@/components/Step3.vue"
export default {
  name: 'NewSource',
  components: {
    Step1, Step2, Step3
  },
  data() {
    return {
      actualStep: 1,
      isButtonNextStepDisabled: true,
      stepCompleted: [false, false, false],
      totalStep: 3,
      step1: {
        inputFormat: 'API'
      }
    }
  },
  props: {

  },
  computed: {
  },
  methods: {
    setValid1(inputFormat){
      this.step1.inputFormat = inputFormat
      this.isButtonNextStepDisabled = false
    },
    onNextStep() {
      this.stepCompleted[this.actualStep - 1] = true
      this.actualStep++
    },
    onPreviousStep() {
      this.actualStep--
      for (let i = 0; i < this.totalStep; i++) {
        if(i > this.actualStep - 1) {
          this.stepCompleted[i] = false
        }
      //this.stepCompleted[this.actualStep -1] = true
      }
    },
    onDashboard() {

    },
    onFinish() {

    }
  }
}
</script>
