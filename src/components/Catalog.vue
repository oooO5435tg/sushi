<script>
import store from "@/store";
export default {
  computed: {
    store() {
      return store
    }
  },
  methods:{

  },
}
</script>

<template>
  <div class="catalog-welcome">
    <img src="../image/welcome.png" class="background-image" />
  </div>
  <div class="over-background-image">
    <div class="welcome-visit-card">
      <h1 style="font-size: 72px; text-align: center">Добро пожаловать в кафе ARIGATO!</h1>
    </div>
    <div class="move-welcome-image">
      <div class="move-circle"></div>
      <div class="move-circle"></div>
      <div class="move-circle"></div>
      <div class="move-circle"></div>
    </div>
  </div>
  <div id="catalog" style="margin: 2% 0 15% 0">
    <h2>Лучшее меню недели</h2>
    <div style="width: 50%; display: flex; justify-content: space-between; margin-top: 2%">
      <div class="products-choice">
        <p>Суши</p>
      </div>
      <div class="products-choice">
        <p>Роллы</p>
      </div>
      <div class="products-choice">
        <p>Десерты</p>
      </div>
      <div class="products-choice">
        <p>Напитки</p>
      </div>
    </div>
    <div style="display: flex; justify-content: center; margin-top: 5%; position: relative">
      <div style="width: 80%;">
        <img src="../image/Аляска.png" alt="аляска фото" style="width: 100%; height: auto; object-fit: cover;"/>
      </div>
      <div style="background: rgba(97, 10, 5, 1); width: 70%; display: flex; flex-direction: column; align-items: center; padding: 5%; position: absolute;
      top: 40%; left: 70%">
        <h3 style="color: white">Аляска</h3>
        <p style="color: white"> Существует множество разновидностей суши, и среди них – адаптированные рестораторами ко вкусу западного человека.
          Краб, лосось, огурцы, авокадо, сливочный сыр «Филадельфия» и кунжут создают этот вкусный ролл, который стоит научиться
          готовить любому кулинару. Аляска относят к так называемым урамаки, что означает «ролл наизнанку».
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catalog-welcome{
  position: relative;
}
.background-image{
  width: 100%;
  height: auto;
  object-fit: cover;
}
.over-background-image{
  position: absolute;
  top: 42%;
  left: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.welcome-visit-card{
  background: rgba(255, 234, 182, 0.6);
  box-shadow: 4px 4px 30px 0px rgba(0, 0, 0, 0.7);
  width: 906px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.welcome-visit-card h1{
  color: rgba(255, 234, 182, 1);
  text-shadow: 4px 4px 30px rgba(0, 0, 0, 0.7);
}
.move-welcome-image{
  width: 25%;
  display: flex;
  justify-content: space-between;
  margin-top: 25%;
}
.move-circle{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid rgba(255, 234, 182, 1);
}
.move-circle:hover{
  background-color: rgba(255, 234, 182, 1);
}

#catalog{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.products-choice{
  width: 15%;
  height: 40px;
  border: 2px solid rgba(97, 10, 5, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.products-choice:hover{
  background: rgba(97, 10, 5, 1);
  color: white;
}
</style>