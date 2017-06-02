export default function(c){
  const t =  {
      appBar: {
        height: 46,
        padding: 12
      },
      toolbar: {
        height: 46,
        titleFontSize: 18
      },
      svgIcon: {
        color: '#ffffff'
      },
      palette: {
        primary1Color: c ? c : '#00BCD4'
      },
      textField: {
        focusColor: 'rgba(255, 255, 255, 0.87)'
      },
      fontFamily: '"PingFang SC","Heiti SC","Microsoft YaHei UI","Microsoft YaHei",SimHei,Roboto,Helvetica,Arial,sans-serif'
    }

  return t
}
