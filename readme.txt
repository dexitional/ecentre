SANITY MODELS
=================
+ press - link to [ group ]
+ group - { general elections , uccabs , nusa, esag }
+ calendar - link to [ session ]
+ instruction
+ faq  - { question, answer }
+ session - { election year }


APPWRITE MODELS
==================
+ voucher [ sessionId, groupId, serial, pin, visible ]
+ session [ tag, title, visible, deadline,]
+ position [ tag, title, groupIds ] { }
+ station [ tag, title, location, venue, ] { ...jcrc, online, local }
+ group  [ tag, title, logo, email, phone, stationId, visible ] { src-lnugs,grasag,jcrcs,uccabs,nusa,}
+ application  [ sessionId, photo, aspirant_regno,aspirant_phone,...., serial,cgpa,form_submit,is_candidate,vetscore,vettotal ]
+ user [ staff_no, name, email, password, roleId, groupId, visible  ]
+ role  [ tag, title, visible ] { super = all privileges, admin = DOS admins, agent = voucher sales, clerk = electoral group admin  }
+ request [ sessionId, title, content, email, phone, request_date,]
+ suggestion
+ sms_account [ regno, serial, credit_balance, bonus_balance, visible ]
+ sms_history [ regno, serial, message, sender, receipient, credit_cost, message_response ]
+ sms_topup  [ regno, serial, provider_name, provider_number, provider_response, order_date, paid, approved, credited  ]
+ sms_sender [ regno, serial, title, approved, visible ]
+ coalition [ sessionId, jcrc_data, src_data, combined_data, published, published_at ]

{/*
    + jcrc_data 
      { tag: '', name: '', teaser: '', order_no: '', serial: '', votes: '', turnout: '  }  
 
*/}



ADMIN CRUD
=============
+ vouchers
+ positions
+ users
+ applicants [ nomination list ]
+ candidates [ candidate list ]