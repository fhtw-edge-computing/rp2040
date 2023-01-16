# Team

<script setup>
import { VPTeamMembers } from 'vitepress/theme'
const members = [
  {
    avatar: 'https://www.github.com/klues.png',
    name: 'Benjamin Klaus',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/klues' },
    ]
  },
  {
    avatar: 'https://www.github.com/mar5chi.png',
    name: 'Maria Schildböck',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/mar5chi' },
    ]
  },
  {
    avatar: 'https://www.github.com/deinhofer.png',
    name: 'Martin Deinhofer',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/deinhofer' },
    ]
  },
  {
    avatar: 'https://www.github.com/sabicalija.png',
    name: 'Alija Sabic',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/sabicalija' },
      { icon: 'twitter', link: 'https://twitter.com/G_qed' }
    ]
  }
]
</script>
<VPTeamMembers size="small" :members="members" />