///// Component //////
export class Component {
    constructor(payload = {}) {
        const {
            tagName = 'div',
            state = {},
            props = {}
        } = payload
        this.el = document.createElement(tagName)
        this.state = state
        this.props = props
        this.render()
    }

    render() {

    }

}


///// Router /////
function routeRender(routes) {
    if (!location.hash) {
        history.replaceState(null, '', '/#/')
    }

    const routerView = document.querySelector('router-view')
    // http://localhost:1234/#/about?name=heropy
    // #/about?name=heropy
    const [hash, queryString = ''] = location.hash.split('?');
    const query = queryString
        .split('&')
        .reduce((acc, cur) => {
            const [key, value] = cur.split('=');
            acc[key] = value
            return acc
        }, {});
    history.replaceState(query, '')

    const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash));
    routerView.innerHTML = ''
    routerView.append(new currentRoute.component().el)

    //스크롤 최상단 유지
    window.scrollTo(0, 0)
}

export function createRouter(routes) {
    return function () {
        // 주소가 바뀔 떄마다 routeRender() 실행
        window.addEventListener('popstate', () => {
            routeRender(routes)
        })
        // 최초 한 번 routeRender() 실행
        routeRender(routes)
    }
}