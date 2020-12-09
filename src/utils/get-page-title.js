import defaultSettings from '@/settings'

const title = defaultSettings.title || '统计后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
