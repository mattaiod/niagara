<template>
  <div class="newSource">
    <v-app>
      <v-container>
        <v-row justify="space-around" align="center" class="mb-8 header">
          <v-col cols="19">
            <v-stepper alt-labels v-model="actualStep">
              <v-stepper-header>
                <v-stepper-step :complete="stepCompleted[0]" step="1">
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
          </v-col>
          <v-col cols="2" class="mr-5">
            <v-btn color="success" @click="onDashboard">Tableau de bord</v-btn>
          </v-col>
        </v-row>
        <Step1 v-if="actualStep == 1" @setValidStep="setValidStep($event)" @setDataStep1="setDataStep1($event)"
        :inputFormat= "step1.inputFormat"></Step1>
        <Step2 v-else-if="actualStep == 2" @setValidStep="setValidStep($event)" @setDataStep2="setDataStep2($event)"
          :pNameCard= "step2.nameCard"
          :pTeamLabel= "step2.teamLabel"></Step2>
        <Step3 v-else-if="actualStep == 3" @setValidStep="setValidStep($event)" @setDataStep3="setDataStep3($event)"
          :pTrigger= "step3.trigger"
          :pDate= "step3.date"
        ></Step3>
        <v-footer
          class="footer"
          color="white"
          padless
          fixed
          height=120
        >
          <div class="btnFooterContainer flex">
            <div v-if="actualStep ==1">
              <v-btn @click="onDashboard">Tableau de Bord</v-btn>
            </div>
            <div v-if="actualStep!=1">
              <v-btn @click="onPreviousStep">Précédent</v-btn>
            </div>
            <div v-if="actualStep!=3">
              <v-btn color="info" @click="onNextStep" :disabled="isButtonNextStepDisabled">Suivant</v-btn>
            </div>
            <div v-else>
              <v-btn color="info" @click="onFinish" :disabled="isButtonNextStepDisabled">Terminer</v-btn>
            </div>
          </div>
        </v-footer>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import firebase from '../Firebase'
const db = firebase.firestore();
import store from '@/store'
import router from '@/router'
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
        inputFormat: ""
      },
      step2: {
        file: null,
        nameCard: "",
        teamLabel: ""
      },
      step3: {
        trigger: "",
        date: ""
      },
    }
  },
  methods: {
    setValidStep(isValid) {
      this.isButtonNextStepDisabled = !isValid
    },
    setDataStep1(inputFormat){
      this.step1.inputFormat = inputFormat
    },
    setDataStep2(content){
      this.step2.file = content.file,
      this.step2.nameCard = content.nameCard,
      this.step2.teamLabel = content.teamLabel
    },
    setDataStep3(content){
      this.step3.trigger = content.trigger,
      this.step3.date = content.date
    },
    onNextStep() {
      this.isButtonNextStepDisabled= true
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
      router.push("/");
    },
    onFinish() {
      const source= {
        inputFormat: this.step1.inputFormat,
        nameCard: this.step2.nameCard,
        teamLabel: this.step2.teamLabel,
        triggerType: this.step3.trigger,
        dateUpdateExpected: this.step3.date
      }
      db.collection("sources")
        .add(source)
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      store.dispatch('addSource', source)
      router.push("/");
    }
  }
}
</script>

<style>
.header {
  background: transparent;
  border: 1px solid #EDEDED;
  box-sizing: border-box;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  border-radius: 0px;
}
.newSource {
  margin-left:10%;
  margin-right: 5%
}
.footer {
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  box-sizing: border-box;
  box-shadow: -10px -5px 20px rgba(0, 0, 0, 0.05);
}
.btnFooterContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 15px;
}
h2 {
  font-family: Source Sans Pro;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 45px;
  letter-spacing: 0em;
  text-align: left;
}
.step {
  margin-left: 20%;
  margin-right: 20%
}
</style>