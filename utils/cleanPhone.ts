export const cleanPhone = (phone: string) => {
  phone = phone.split(' ')[0].trim()
  phone = phone.split('/')[0].trim()
  phone = phone.split('.')[0].trim()
  phone = phone.split('-')[0].trim()
  phone = phone.split('.')[0].trim()
          
  return phone;

}