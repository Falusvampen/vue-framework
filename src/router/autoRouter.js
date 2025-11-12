const getViews = () => {
  const views = import.meta.glob('../views/**/*.vue', { eager: true })
  console.log('okokview', views)
  const viewComponents = {}
  for (const path in views) {
    const componentName = path.split('/').pop().replace('.vue', '')
    viewComponents[componentName] = views[path].default
  }
  return viewComponents
}

const convertNameToPath = (name) => {
  const cleanName = name.replace(/View$/, '')
  console.log('nice', name, 'odfasd', cleanName)
  return (
    '/' +
    cleanName
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '')
  )
}

const getComponentsFromViewsFiles = () => {
  const views = import.meta.glob('../views/**/*.vue', { eager: true })
  const routes = []
  for (const path in views) {
    const componentName = path.split('/').pop().replace('.vue', '')
    const routePath = componentName === 'HomeView' ? '/' : convertNameToPath(componentName)
    routes.push({
      path: routePath,
      name: componentName,
      component: views[path].default,
    })
  }
  return routes
}

export { getViews, getComponentsFromViewsFiles }
export default getComponentsFromViewsFiles
