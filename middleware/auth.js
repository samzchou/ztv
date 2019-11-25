export default function({ store, redirect, route }) {
    // 非登录页且store中无个人信息时重定向到登录页
    if (!store.state.user && route.path.indexOf('/login') !== 0) {
        return redirect('/login', { prev_path: route.fullPath });
    }
}