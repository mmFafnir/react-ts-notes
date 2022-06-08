

export const device ={
  MOBILE: 'mobile',
  DESKTOP: 'desktop'
}

const checkDevice = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return device.MOBILE
      } else {
        return device.DESKTOP
    }
}

export default checkDevice