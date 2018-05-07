<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    name: 'SpeedChart',
    props: ['data', 'options'],
    data () {
      return {
        data0: [0, 0, 0, 0, 0, 0, 0],
        data1: [0, 0, 0, 0, 0, 0, 0],
        labels: ['', '', '', '', '', '', '']
      }
    },
    mounted: function () {
      this.render()
      this.dataChange()
    },
    computed: {
      upload () {
        return (this.$store.state.dashBoard[0] / 1024).toFixed()
      },
      download () {
        return (this.$store.state.dashBoard[1] / 1024).toFixed()
      }
    },
    methods: {
      render () {
        this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
        this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

        this.gradient.addColorStop(0, 'rgba(248,121,121,.5)')
        this.gradient.addColorStop(0.5, 'rgba(248,121,121,.25)')
        this.gradient.addColorStop(1, 'rgba(248,121,121,0)')

        this.gradient2.addColorStop(0, 'rgba(76,154,254, 0.9)')
        this.gradient2.addColorStop(0.5, 'rgba(76,154,254, 0.25)')
        this.gradient2.addColorStop(1, 'rgba(76,154,254, 0)')
        //  渲染
        this.renderChart({
          labels: this.labels,
          datasets: [
            {
              label: '上传',
              borderColor: 'rgb(248,121,121)',
              pointBackgroundColor: 'transparent',
              pointBorderColor: 'transparent',
              borderWidth: 1,
              backgroundColor: this.gradient,
              // backgroundColor: 'rgba(248,121,121,.4)',
              data: this.data0
            }, {
              label: '下载',
              borderColor: 'rgb(76,154,254)',
              pointBackgroundColor: 'transparent',
              pointBorderColor: 'transparent',
              borderWidth: 1,
              backgroundColor: this.gradient2,
              data: this.data1
            }
          ]
        }, {
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                fontSize: 0
              }
            }],
            yAxes: [{
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                beginAtZero: true,
                fontSize: 8
              }
            }]
          },
          tooltips: {
            duration: 200,
            enabled: false
          },
          animation: {
            easing: 'easeOutCubic'
          },
          hover: {
            animationDuration: 0 // duration of animations when hovering an item
          },
          events: [],
          legend: {
            display: false
          }
        })
      },
      dataChange () {
        window.setInterval(() => {
          this.data0.push(this.upload * 1)
          this.data0.shift()
          // console.log(this.data0)
          this.data1.push(this.download * 1)
          this.data1.shift()
          // console.log(this.data1)
          this.render()
        }, 3000)
      }
    }
  }
</script>

<style scoped>

</style>