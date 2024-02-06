import Vue from 'vue';
import moment from 'moment';
import { add_commas } from '@/thirdParty/add_commas';

const daysOfWeek = {
  CN: 'Chủ nhật',
  T2: 'Thứ 2',
  T3: 'Thứ 3',
  T4: 'Thứ 4',
  T5: 'Thứ 5',
  T6: 'Thứ 6',
  T7: 'Thứ 7'
}

Vue.filter('formatDatePicker', date => {
  if (!date) return
  return moment(date).format('DD/MM/YYYY')
})

Vue.filter('formatDateTime', date => {
  if (!date) return
  return moment(date).format('DD/MM/YYYY HH:mm:ss')
})

Vue.filter('formatDateTime1', date => {
  if (!date) return '--:--'
  return moment(date).format('HH:mm DD/MM/YYYY')
})

Vue.filter('formatDateTime2', date => {
  if (!date) return '--:--'
  return moment(date).format('HH:mm A')
})

Vue.filter('formatDateTime3', date => {
  if (!date) return '--:--'
  return moment(date).format('HH:mm:00')
})

Vue.filter('formatDateTime4', date => {
  if (!date) return '--:--'
  return moment(date).format('HH:mm:ss DD/MM/YYYY')
})

Vue.filter('formatDateTime5', (date) => {
  if (!date) return
  const ms = moment(date).valueOf()
  return moment(ms).format('hh:mm:ss DD/MM/YYYY')
})

Vue.filter('formatDateTime6', date => {
  if (!date) return '--:--'
  return moment.utc(date).format('DD/MM/YYYY HH:mm:ss')
})

Vue.filter('formatDateTime7', (date) => {
  if (!date) return '--:--'
  const ms = moment(date).valueOf()
  return moment(ms).format('HH:mm, DD/MM/YYYY')
})

Vue.filter('formatDate', date => {
  if (!date) return
  return moment(date).format('DD/MM/YYYY')
})

Vue.filter('formatHour', date => {
  if (!date) return
  return moment(date).format('HH:mm')
})

Vue.filter('formatDate1', date => {
  return date.substring(0, 10)
})

Vue.filter('formatHour1', date => {
  return date.substring(10, 16)
})

Vue.filter('formatDateDay', date => {
  if (!date) return
  return moment(date).format('DD')
})

Vue.filter('formatDateMonth', date => {
  if (!date) return
  return moment(date).format('MM')
})

Vue.filter('formatDateYear', date => {
  if (!date) return
  return moment(date).format('YYYY')
})

Vue.filter('formatDay', date => {
  return daysOfWeek[date]
})

Vue.filter('placeHolder', data => {
  return data || 'null'
})

Vue.filter('fomatCurrency', currency => {
  return Number(currency).toLocaleString('vi-VI', {
    style: 'currency',
    currency: 'VND'
  })
})

Vue.filter('formatNumbers', data => {
  if (!data) return ''
  return add_commas(data)
})

Vue.filter('fomatCustomtype', (type) => {
  if (type === 'HOUSEHOLD') return 'Hộ kinh doanh'
  if (type === 'COMPANY') return 'Doanh nghiệp'
  if (type === 'INDIVIDUAL') return 'Cá nhân'
})

Vue.filter('mapContractype', (data) => {
  if (!data) return
  if (data === 'READER') {
    return 'Thiết bị'
  }
  if (data === 'PAYMENT') {
    return 'Thanh toán'
  }
  if (data === 'INSTALLMENT') {
    return 'Trả góp'
  }
  if (data === 'QRCODE') {
    return 'QRCode'
  }
  if (data === 'OTHER') {
    return 'Khác'
  }
})

Vue.filter('mapTypeAppendix', (data) => {
  if (!data) return
  if (data === 'DEVICE') {
    return 'Thiết bị'
  }
  if (data === 'PAYMENT') {
    return 'Thanh toán'
  }
  if (data === 'INSTALLMENT') {
    return 'Trả góp'
  }
  if (data === 'QRCODE') {
    return 'QRCode'
  }
  if (data === 'OTHER') {
    return 'Khác'
  }
})

Vue.filter('mapdepositType', (data) => {
  if (!data) return
  if (data === 'BAN') {
    return 'Bán'
  }
  if (data === 'DAT_COC') {
    return 'Đặt cọc'
  }
})

Vue.filter('formatDirection', (data) => {
  if (data === 'outbound') return 'Gọi đi'
  if (data === 'inbound') return 'Gọi đến'
})

Vue.filter('mapTextTypeChange', (value) => {
  if (!value) return
  if (value === 'INFOR1') {
    return 'Đổi thông tin thanh toán, người đại diện'
  }
  if (value === 'INFOR2') {
    return 'Đổi thông tin Email và địa chỉ thanh toán'
  }
})

Vue.filter('mapAppenixFee', (data) => {
  if (!data) return
  if (data === 'DEVICE') {
    return 'Phụ lục thiết bị'
  }
  if (data === 'CREDIT') {
    return 'Phụ lục trả góp'
  }
  if (data === 'TRANS') {
    return 'Phụ lục giao dịch'
  }
  if (data === 'CHANGE') {
    return 'Phụ lục thay đổi thông tin'
  }
})

Vue.filter('fomatSaleType', (type) => {
  switch (type) {
    case 'REGION_DIRECTOR':
      return 'Giám đốc vùng'
    case 'SALE_MANAGER':
      return 'Sale Manager'
    case 'SALE_LEADER':
      return 'Sale Leader'
    case 'AFTER_SALE_LEADER':
      return 'After Sale Leader'
    case 'TELESALE_LEADER':
      return 'Telesale Leader'
    case 'SALE':
      return 'Sale Man'
    case 'SALE_ADMIN':
      return 'Sale Admin'
    case 'AFTER_SALE':
      return 'After Sale'
    case 'TELESALE':
      return 'Telesale'
    case 'KEY_ACCOUNT':
      return 'Key Account'
    default:
      return 'Không xác định'
  }
})

Vue.filter('transformData', (data, dataListRole) => {
  const dataFilter = dataListRole.filter((e) => e.id === data)
  if (dataFilter.length === 0) {
    return ''
  }
  return dataFilter[0].text
})

Vue.filter('transfromMccName', (data, dataConfigMcc) => {
  const dataFilter = dataConfigMcc.filter((e) => e.code === data)
  if (dataFilter.length === 0) {
    return ''
  }
  return dataFilter[0].name
})

Vue.filter('transfromRegion', (data, dataConfigRegion) => {
  const dataReturn = dataConfigRegion.filter((e) => e.id === data)
  if (dataReturn.length === 0) {
    return ''
  }
  return dataReturn[0].text
})

Vue.filter('transfromData', (data, dataListRole) => {
  const dataFilter = dataListRole.filter((e) => e.id === data)
  if (dataFilter.length === 0) {
    return ''
  }
  return dataFilter[0].text
})

Vue.filter('transfromCat', (data, dataConfigPurposes) => {
  const dataFilter = dataConfigPurposes.filter((e) => e.id === data)
  if (dataFilter.length === 0) {
    return ''
  }
  return dataFilter[0].text
})

Vue.filter('fomatStatus', (status, listStatus) => {
  const dataFilter = listStatus.filter((e) => e.id === status)
  return dataFilter[0].text
})

Vue.filter('transfromStatusCat', (data, purposesStatus) => {
  const dataFilter = purposesStatus.filter((e) => e.code === data)
  if (dataFilter.length === 0) {
    return ''
  }
  return dataFilter[0].text
})

Vue.filter('mapA', (data, list) => {
  let text = '-'
  list.map((e) => {
    if (e.period === data) text = e.rate + '%'
  })
  return text
})

Vue.filter('formatDateHHMM', value => {
  if (!value) return
  return moment(value).format('HH:mm:ss DD/MM/YYYY')
})

Vue.filter('formatDateHHMM00', value => {
  if (!value) return
  return moment(value).format('HH:mm:00 DD/MM/YYYY')
})

Vue.filter('formatDay', value => {
  return daysOfWeek[value]
})

Vue.filter('fomatSaleType', value => {
  if (!value) return
  switch (value) {
    case 'REGION_DIRECTOR':
      return 'Giám đốc vùng'
    case 'SALE_MANAGER':
      return 'Sale Manager'
    case 'SALE_LEADER':
      return 'Sale Leader'
    case 'AFTER_SALE_LEADER':
      return 'After Sale Leader'
    case 'TELESALE_LEADER':
      return 'Telesale Leader'
    case 'SALE':
      return 'Sale Man'
    case 'SALE_ADMIN':
      return 'Sale Admin'
    case 'AFTER_SALE':
      return 'After Sale'
    case 'TELESALE':
      return 'Telesale'
    case 'KEY_ACCOUNT':
      return 'Key Account'
    default:
      return 'Không xác định'
  }
})

Vue.filter('fomatTypeAddtionalKepping', value => {
  if (!value) return
  switch (value) {
    case 'TAKE_LEAVE':
      return 'Nghỉ phép'
    case 'ATTN_ADD':
      return 'Chấm công bổ sung'
    case 'VACATION_MODE':
      return 'Nghỉ chế độ(Khám thai, hiếu, hỉ, vợ sinh,...)'
    case 'DEPARTMENT_POLICY':
      return 'Nghỉ theo chính sách bộ phận'
    default:
      return 'Không xác định'
  }
})

Vue.filter('fomatReasonAttnAdd', value => {
  if (!value) return
  switch (value) {
    case 'FORGOT_ATTN':
      return 'Quên chấm công'
    case 'COMPANY_WORK':
      return 'Việc công ty'
    case 'PERSONAL_WORK':
      return 'Việc cá nhân'
    case 'TIME_KEEPER_ERROR':
      return 'Máy chấm công lỗi'
    default:
      return 'Không xác định'
  }
})
Vue.filter('mapDateStatus', value => {
  switch (value) {
    case 'NEW':
      return 'Ngày tạo'
    case 'WAITING_APPROVED_FEE':
      return 'Ngày tạo'
    case 'APPROVED_FEE':
      return 'Ngày tạo'
    case 'SENT':
      return 'Ngày tạo'
    case 'WAITING_SIGN':
      return 'Ngày tạo'
    case 'SIGNING':
      return 'Ngày tạo'
    case 'SIGNED_MISS_IMAGE':
      return 'Ngày ký'
    case 'SIGNED':
      return 'Ngày ký'
    case 'SIGNED_WAITING_APPROVED':
      return 'Ngày ký'
    case 'APPROVED':
      return 'Ngày ký'
    case 'REJECTED_SA':
      return 'Ngày ký'
    case 'REJECTED_MC':
      return 'Ngày tạo'
    case 'REJECTED_MA':
      return 'Ngày tạo'
    case 'CANCELED':
      return 'Ngày hủy'
    default:
      return 'Không xác định'
  }
})
Vue.filter('fomatStatusTextAdd', value => {
  if (!value) return
  switch (value) {
    case 'NEW':
      return 'Mới tạo'
    case 'WAITING':
      return 'Chờ duyệt'
    case 'DENIED':
      return 'Đã hủy'
    case 'APRROVED':
      return 'Đã duyệt'
    case 'NOT_ACCEPT':
      return 'Không chấp nhận'
    case 'ACCEPT':
      return 'Chấp nhận'
    default:
      return 'Không xác định'
  }
})

Vue.filter('fomatTypeHistory', value => {
  if (!value) return
  switch (value) {
    case 'HISTORY_APPROVED_FEE':
      return 'Duyệt phí'
    case 'HISTORY_APPROVED':
      return 'Duyệt'
    case 'PAPER_ACTION_APPROVE':
      return 'Duyệt'
    case 'HISTORY_REJECTED_MA':
      return 'MA từ chối'
    case 'HISTORY_REJECTED_SA':
      return 'SA từ chối'
    case 'HISTORY_ADDITIONAL':
      return 'Cần bổ sung'
    case 'PAPER_ACTION_ADD_INFO':
      return 'Cần bổ sung'
    case 'HISTORY_APPROVED_COLLABORATOR':
      return 'GS Duyệt trả hoa hồng'
    case 'HISTORY_REJECTED_COLLABORATOR':
      return 'GS Từ chối trả hoa hồng'
    default:
      return 'Không xác định'
  }
})

Vue.filter('mapTextStatus', (data, listState) => {
  if (!data) return
  const text = listState.filter((e) => e.id === data)
  return text.length > 0 ? text[0].text : ''
})

Vue.filter('resultCall', (data, resultStatusCalls) => {
  const response = resultStatusCalls.find((e) => e.code === data)
  return response ? response.value : null
})

Vue.filter('fomatTextService', (data, listSerive) => {
  if (!data || !listSerive) return null
  const dataReturn = listSerive.find(e => e.service === data)
  if (dataReturn) return dataReturn.name
})

Vue.filter('transformNumber', (data) => {
  return data ? data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : ''
})

Vue.filter('transformMoney', data => {
  return data ? data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : ''
})
