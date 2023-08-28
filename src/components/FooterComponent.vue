<template>
  <div class="footer">
    <p>
      This game owned by
      <a href="https://github.com/HoangPhanDev98">HoangPhanDev98</a>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 1.5rem;
  color: var(--light);
  z-index: 3;
  font-size: 1.5rem;

  a {
    color: #f4dc26;
    padding-left: 0.325rem;
  }
}
</style>
