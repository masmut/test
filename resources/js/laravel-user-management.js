/**
 * Page User List
 */

'use strict';

// Datatable (jquery)
$(function () {

  // Variable declaration for table
  var dt_user_table = $('.datatables-users'),
    select2 = $('.select2'),
    select3 = $('.select3'),
    select4 = $('.select4'),
    userView = baseUrl + 'app/user/view/account',
    offCanvasForm = $('#offcanvasAddUser');
  if (select2.length) {
    var $this = select2;
    $this.wrap('<div class="position-relative"></div>').select2({
      placeholder: 'Pilih Salah Satu',
      dropdownParent: $this.parent()
    });
  }


  // ajax setup
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  // Users datatable
  if (dt_user_table.length) {
    var dt_user = dt_user_table.DataTable({
      processing: true,
      serverSide: true,
      ajax: {
        url: baseUrl + 'user-list'
      },
      columns: [
      // columns according to JSON
      { data: '' },
      { data: '' },
      { data: 'id' },
      { data: 'name' },
      { data: 'email' },
      { data: 'username' },
      { data: 'saldo' },
      { data: 'koin' },
      { data: 'refferal' },
      { data: 'whatsapp' },
      { data: 'city' },
      { data: 'status' },
      { data: 'level' },
      { data: 'email_verified_at' }, {
        data: 'action'
      }],
      columnDefs: [{
        // For Responsive
        className: 'control',
        searchable: false,
        orderable: false,
        responsivePriority: 2,
        targets: 0,
        render: function render(data, type, full, meta) {
          return '';
        }
      }, {
        searchable: false,
        orderable: false,
        targets: 1,
        render: function render(data, type, full, meta) {
          return "<span>".concat(full.fake_id, "</span>");
        }
      },
      {
        // For Checkboxes
        targets: 2,
        orderable: false,
        searchable: false,
        responsivePriority: 3,
        checkboxes: true,
        render: function () {
          return '<input type="checkbox" class="dt-checkboxes form-check-input">';
        },
        checkboxes: {
          selectAllRender: '<input type="checkbox" class="form-check-input">'
        }
      }, {
        // User full name
        targets: 3,
        responsivePriority: 4,
        render: function render(data, type, full, meta) {
          var $name = full['name'];

          // For Avatar badge
          var stateNum = Math.floor(Math.random() * 6);
          var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
          var $state = states[stateNum],
            $name = full['name'],
            $initials = $name.match(/\b\w/g) || [],
            $output;
          $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
          $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';

          // Creates full output for row
          var $row_output = '<div class="d-flex justify-content-start align-items-center user-name">' + '<div class="avatar-wrapper">' + '<div class="avatar avatar-sm me-3">' + $output + '</div>' + '</div>' + '<div class="d-flex flex-column">' + '<a href="' + userView + '" class="text-body text-truncate"><span class="fw-semibold">' + $name + '</span></a>' + '</div>' + '</div>';
          return $row_output;
        }
      },         {
        // User email
        targets: 4,
        render: function render(data, type, full, meta) {
          var $email = full['email'];
          return '<span class="user-email">' + $email + '</span>';
        }
      },
      {
        // User email
        targets: 5,
        render: function render(data, type, full, meta) {
          var $username = full['username'];
          return '<span class="user-email">' + $username + '</span>';
        }
      },
      {
        // User email
        targets: 6,
        render: function render(data, type, full, meta) {
          var $saldo = full['saldo'];
          return '<span class="user-email">' + $saldo + '</span>';
        }
      },
      {
        // User email
        targets: 7,
        render: function render(data, type, full, meta) {
          var $koin = full['koin'];
          return '<span class="user-email">' + $koin + '</span>';
        }
      },
      {
        // User email
        targets: 8,
        render: function render(data, type, full, meta) {
          var $refferal = full['refferal'];
          return '<span class="user-email">' + $refferal + '</span>';
        }
      },
      {
        // User email
        targets: 9,
        render: function render(data, type, full, meta) {
          var $whatsapp = full['whatsapp'];
          return '<span class="user-email">' + $whatsapp + '</span>';
        }
      },
      {
        // User email
        targets: 10,
        render: function render(data, type, full, meta) {
          var $city = full['city'];
          return '<span class="user-email">' + $city + '</span>';
        }
      },
      {
        // User email
        targets: 11,
        render: function render(data, type, full, meta) {
          var $status = full['status'];
          return '<span class="user-email">' + $status + '</span>';
        }
      },
      {
        // User email
        targets: 12,
        render: function render(data, type, full, meta) {
          var $level = full['level'];
          return '<span class="user-email">' + $level + '</span>';
        }
      },
      {
        // User email
        targets: 13,
        render: function render(data, type, full, meta) {
          var $email_verified_at = full['email_verified_at'];
          return '<span class="user-email">' + $email_verified_at + '</span>';
        }
      }, {
        // Actions
        targets: -1,
        title: 'Actions',
        searchable: false,
        orderable: false,
        render: function render(data, type, full, meta) {
          return '<div class="d-inline-block text-nowrap">' + "<button class=\"btn btn-sm btn-icon edit-record\" data-id=\"".concat(full['id'], "\" data-bs-toggle=\"offcanvas\" data-bs-target=\"#offcanvasAddUser\"><i class=\"bx bx-edit\"></i></button>") + "<button class=\"btn btn-sm btn-icon delete-record\" data-id=\"".concat(full['id'], "\"><i class=\"bx bx-trash\"></i></button>") + '<button class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>' + '<div class="dropdown-menu dropdown-menu-end m-0">' + '<a href="' + userView + '" class="dropdown-item">View</a>' + '<a href="javascript:;" class="dropdown-item">Suspend</a>' + '</div>' + '</div>';
        }
      }],
      order: [[2, 'desc']],
      dom: '<"row mx-2"' + '<"col-md-2"<"me-3"l>>' + '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' + '>t' + '<"row mx-2"' + '<"col-sm-12 col-md-6"i>' + '<"col-sm-12 col-md-6"p>' + '>',
      language: {
        sLengthMenu: '_MENU_',
        search: '',
        searchPlaceholder: 'Search..'
      },
      // Buttons with Dropdown
      buttons: [{
        extend: 'collection',
        className: 'btn btn-outline-secondary dropdown-toggle mx-3',
        text: '<i class="bx bx-export me-2"></i>Export',
        buttons: [{
          extend: 'print',
          title: 'Users',
          text: '<i class="bx bx-printer me-2" ></i>Print',
          className: 'dropdown-item',
          exportOptions: {
            columns: [2, 3],
            // prevent avatar to be print
            format: {
              body: function body(inner, coldex, rowdex) {
                if (inner.length <= 0) return inner;
                var el = $.parseHTML(inner);
                var result = '';
                $.each(el, function (index, item) {
                  if (item.classList !== undefined && item.classList.contains('user-name')) {
                    result = result + item.lastChild.textContent;
                  } else result = result + item.innerText;
                });
                return result;
              }
            }
          },
          customize: function customize(win) {
            //customize print view for dark
            $(win.document.body).css('color', config.colors.headingColor).css('border-color', config.colors.borderColor).css('background-color', config.colors.body);
            $(win.document.body).find('table').addClass('compact').css('color', 'inherit').css('border-color', 'inherit').css('background-color', 'inherit');
          }
        }, {
          extend: 'csv',
          title: 'Users',
          text: '<i class="bx bx-file me-2" ></i>Csv',
          className: 'dropdown-item',
          exportOptions: {
            columns: [2, 3],
            // prevent avatar to be print
            format: {
              body: function body(inner, coldex, rowdex) {
                if (inner.length <= 0) return inner;
                var el = $.parseHTML(inner);
                var result = '';
                $.each(el, function (index, item) {
                  if (item.classList.contains('user-name')) {
                    result = result + item.lastChild.textContent;
                  } else result = result + item.innerText;
                });
                return result;
              }
            }
          }
        }, {
          extend: 'excel',
          title: 'Users',
          text: '<i class="bx bxs-file-export me-2"></i>Excel',
          className: 'dropdown-item',
          exportOptions: {
            columns: [2, 3],
            // prevent avatar to be display
            format: {
              body: function body(inner, coldex, rowdex) {
                if (inner.length <= 0) return inner;
                var el = $.parseHTML(inner);
                var result = '';
                $.each(el, function (index, item) {
                  if (item.classList.contains('user-name')) {
                    result = result + item.lastChild.textContent;
                  } else result = result + item.innerText;
                });
                return result;
              }
            }
          }
        }, {
          extend: 'pdf',
          title: 'Users',
          text: '<i class="bx bxs-file-pdf me-2"></i>Pdf',
          className: 'dropdown-item',
          exportOptions: {
            columns: [2, 3],
            // prevent avatar to be display
            format: {
              body: function body(inner, coldex, rowdex) {
                if (inner.length <= 0) return inner;
                var el = $.parseHTML(inner);
                var result = '';
                $.each(el, function (index, item) {
                  if (item.classList.contains('user-name')) {
                    result = result + item.lastChild.textContent;
                  } else result = result + item.innerText;
                });
                return result;
              }
            }
          }
        }, {
          extend: 'copy',
          title: 'Users',
          text: '<i class="bx bx-copy me-2" ></i>Copy',
          className: 'dropdown-item',
          exportOptions: {
            columns: [2, 3],
            // prevent avatar to be copy
            format: {
              body: function body(inner, coldex, rowdex) {
                if (inner.length <= 0) return inner;
                var el = $.parseHTML(inner);
                var result = '';
                $.each(el, function (index, item) {
                  if (item.classList.contains('user-name')) {
                    result = result + item.lastChild.textContent;
                  } else result = result + item.innerText;
                });
                return result;
              }
            }
          }
        }]
      }, {
        text: '<div class="btn-group"><button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Pilihan</button><ul class="dropdown-menu p-2"><li><a class="dropdown-item btn btn-primary mt-2" data-bs-toggle="collapse" data-bs-target="#collapseAddUser" href="javascript:void(0);"><i class="tf-icons bx bx-plus"></i> Tambah User</a></li><li><a class="dropdown-item btn btn-danger mt-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddUser" href="javascript:void(0);"><i class="tf-icons bx bx-trash"></i> Hapus</a></li><li><a class="dropdown-item btn btn-warning mt-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddUser" href="javascript:void(0);"><i class="tf-icons bx bx-minus"></i> Suspend</a></li></ul></div>',
        // text: '<i class="bx bx-plus me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Add New User</span>',
        className: 'opsi btn p-0 m-0',
        // attr: {
        //   'data-bs-toggle': 'offcanvas',
        //   'data-bs-target': '#offcanvasAddUser'
        // }
      }],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function header(row) {
              var data = row.data();
              return 'Details of ' + data['name'];
            }
          }),
          type: 'column',
          renderer: function renderer(api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
              ? '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' + '<td>' + col.title + ':' + '</td> ' + '<td>' + col.data + '</td>' + '</tr>' : '';
            }).join('');
            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      }
    });
  }

  // Delete Record
  $(document).on('click', '.delete-record', function () {
    var user_id = $(this).data('id'),
      dtrModal = $('.dtr-bs-modal.show');

    // hide responsive modal in small screen
    if (dtrModal.length) {
      dtrModal.modal('hide');
    }

    // sweetalert for confirmation of delete
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary me-3',
        cancelButton: 'btn btn-label-secondary'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        // delete the data
        $.ajax({
          type: 'DELETE',
          url: "".concat(baseUrl, "user-list/").concat(user_id),
          success: function success() {
            dt_user.draw();
          },
          error: function error(_error) {
            console.log(_error);
          }
        });

        // success sweetalert
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The user has been deleted!',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'The User is not deleted!',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      }
    });
  });

  // edit record
  $(document).on('click', '.edit-record', function () {
    var user_id = $(this).data('id'),
      dtrModal = $('.dtr-bs-modal.show');

    // hide responsive modal in small screen
    if (dtrModal.length) {
      dtrModal.modal('hide');
    }

    // changing the title of offcanvas
    $('#offcanvasAddUserLabel').html('Edit User');

    // get data
    $.get("".concat(baseUrl, "user-list/").concat(user_id, "/edit"), function (data) {
      $('#user_id').val(data.id);
      $('#add-user-fullname').val(data.name);
      $('#add-user-email').val(data.email);
    });
  });

  // changing the title
  $('.add-new').on('click', function () {
    $('#user_id').val(''); //reseting input field
    $('#offcanvasAddUserLabel').html('Add User');
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(function () {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);

  // validating form and updating user's data
  var addNewUserForm = document.getElementById('addNewUserForm');

  // user form validation
  var fv = FormValidation.formValidation(addNewUserForm, {
    fields: {
      name: {
        validators: {
          notEmpty: {
            message: 'Please enter fullname'
          }
        }
      },
      email: {
        validators: {
          notEmpty: {
            message: 'Please enter your email'
          },
          emailAddress: {
            message: 'The value is not a valid email address'
          }
        }
      },
      userContact: {
        validators: {
          notEmpty: {
            message: 'Please enter your contact'
          }
        }
      },
      company: {
        validators: {
          notEmpty: {
            message: 'Please enter your company'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        // Use this for enabling/changing valid/invalid class
        eleValidClass: '',
        rowSelector: function rowSelector(field, ele) {
          // field is the field name & ele is the field element
          return '.mb-3';
        }
      }),
      submitButton: new FormValidation.plugins.SubmitButton(),
      // Submit the form when all fields are valid
      // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  }).on('core.form.valid', function () {
    // adding or updating user when form successfully validate
    $.ajax({
      data: $('#addNewUserForm').serialize(),
      url: "".concat(baseUrl, "user-list"),
      type: 'POST',
      success: function success(status) {
        dt_user.draw();
        offCanvasForm.offcanvas('hide');

        // sweetalert
        Swal.fire({
          icon: 'success',
          title: "Successfully ".concat(status, "!"),
          text: "User ".concat(status, " Successfully."),
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      },
      error: function error(err) {
        offCanvasForm.offcanvas('hide');
        Swal.fire({
          title: 'Duplicate Entry!',
          text: 'Your email should be unique.',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      }
    });
  });

  // clearing form data when offcanvas hidden
  offCanvasForm.on('hidden.bs.offcanvas', function () {
    fv.resetForm(true);
  });

  // Wizard Validation
  // --------------------------------------------------------------------
  const wizardValidation = document.querySelector('#wizard-validation');
  if (typeof wizardValidation !== undefined && wizardValidation !== null) {
    // Wizard form
    const wizardValidationForm = wizardValidation.querySelector('#wizard-validation-form');
    // Wizard steps
    const wizardValidationFormStep1 = wizardValidationForm.querySelector('#account-details-validation');
    const wizardValidationFormStep2 = wizardValidationForm.querySelector('#personal-info-validation');
    const wizardValidationFormStep3 = wizardValidationForm.querySelector('#social-links-validation');
    // Wizard next prev button
    const wizardValidationNext = [].slice.call(wizardValidationForm.querySelectorAll('.btn-next'));
    const wizardValidationPrev = [].slice.call(wizardValidationForm.querySelectorAll('.btn-prev'));

    const validationStepper = new Stepper(wizardValidation, {
      linear: true
    });

    // Account details
    const FormValidation1 = FormValidation.formValidation(wizardValidationFormStep1, {
      fields: {
        formValidationUsername: {
          validators: {
            notEmpty: {
              message: '*Wajib Diisi'
            },
            stringLength: {
              min: 6,
              max: 30,
              message: 'The name must be more than 6 and less than 30 characters long'
            },
            regexp: {
              regexp: /^[a-zA-Z0-9 ]+$/,
              message: 'The name can only consist of alphabetical, number and space'
            }
          }
        },
        formValidationEmail: {
          validators: {
            notEmpty: {
              message: '*Wajib Diisi'
            },
            emailAddress: {
              message: 'The value is not a valid email address'
            }
          }
        },
        formValidationPass: {
          validators: {
            notEmpty: {
              message: '*Wajib Diisi'
            }
          }
        },
        formValidationPIN: {
          validators: {
            notEmpty: {
              message: '*Wajib Diisi'
            },
            stringLength: {
              min: 6,
              max: 6,
              message: 'PIN Harus 6 Digit'
            }
          }
        }
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: '',
          rowSelector: '.col-sm-6'
        }),
        autoFocus: new FormValidation.plugins.AutoFocus(),
        submitButton: new FormValidation.plugins.SubmitButton()
      },
      init: instance => {
        instance.on('plugins.message.placed', function (e) {
          //* Move the error message out of the `input-group` element
          if (e.element.parentElement.classList.contains('input-group')) {
            e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
          }
        });
      }
    }).on('core.form.valid', function () {
      // Jump to the next step when all fields in the current step are valid
      validationStepper.next();
    });

    // Personal info
    const FormValidation2 = FormValidation.formValidation(wizardValidationFormStep2, {
      fields: {
        formValidationNama: {
          validators: {
            notEmpty: {
              message: '*Wajib Diisi'
            }
          }
        },
        formValidationKota: {
          validators: {
            notEmpty: {
              message: '*Wajib Diisi'
            }
          }
        },
        formValidationWhatsapp: {
          validators: {
            notEmpty: {
              message: '*Wajib Diisi'
            },
            stringLength: {
              min: 11,
              max: 13,
              message: 'Maksimal Nomor WA 13 Angka'
            }
          }
        },
        formValidationStatus: {
          validators: {
            notEmpty: {
              message: '*Wajib Diisi'
            }
          }
        },
        formValidationLevel: {
          validators: {
            notEmpty: {
              message: '*Wajib Diisi'
            }
          }
        },
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: '',
          rowSelector: '.col-sm-6'
        }),
        autoFocus: new FormValidation.plugins.AutoFocus(),
        submitButton: new FormValidation.plugins.SubmitButton()
      }
    }).on('core.form.valid', function () {
      // Jump to the next step when all fields in the current step are valid
      validationStepper.next();
    });

    // // Bootstrap Select (i.e Language select)
    // if (selectPicker.length) {
    //   selectPicker.each(function () {
    //     var $this = $(this);
    //     $this.selectpicker().on('change', function () {
    //       FormValidation2.revalidateField('formValidationLanguage');
    //     });
    //   });
    // }

    // select3
    if (select3.length) {
      select3.each(function () {
        var $this = $(this);
        $this.wrap('<div class="position-relative"></div>');
        $this
          .select2({
            placeholder: 'Pilih Salah Satu',
            dropdownParent: $this.parent()
          })
          .on('change.select3', function () {
            // Revalidate the color field when an option is chosen
            FormValidation2.revalidateField('formValidationCountry');
          });
      });
    }
    // select4
    if (select4.length) {
      select4.each(function () {
        var $this = $(this);
        $this.wrap('<div class="position-relative"></div>');
        $this
          .select2({
            placeholder: 'Pilih Salah Satu',
            dropdownParent: $this.parent()
          })
          .on('change.select4', function () {
            // Revalidate the color field when an option is chosen
            FormValidation2.revalidateField('formValidationLevel');
          });
      });
    }

    // Social links
    const FormValidation3 = FormValidation.formValidation(wizardValidationFormStep3, {
      fields: {
        formValidationSaldo: {
          validators: {
            notEmpty: {
              message: '*Wajib Diisi'
            }
          }
        },
        formValidationKoin: {
          validators: {
            notEmpty: {
              message: '*Wajib Diisi'
            }
          }
        }
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: '',
          rowSelector: '.col-sm-6'
        }),
        autoFocus: new FormValidation.plugins.AutoFocus(),
        submitButton: new FormValidation.plugins.SubmitButton()
      }
    }).on('core.form.valid', function () {
      // You can submit the form
      // wizardValidationForm.submit()
      // or send the form data to server via an Ajax request
      // To make the demo simple, I just placed an alert
      alert('Submitted..!!');
    });

    wizardValidationNext.forEach(item => {
      item.addEventListener('click', event => {
        // When click the Next button, we will validate the current step
        switch (validationStepper._currentIndex) {
          case 0:
            FormValidation1.validate();
            break;

          case 1:
            FormValidation2.validate();
            break;

          case 2:
            FormValidation3.validate();
            break;

          default:
            break;
        }
      });
    });

    wizardValidationPrev.forEach(item => {
      item.addEventListener('click', event => {
        switch (validationStepper._currentIndex) {
          case 2:
            validationStepper.previous();
            break;

          case 1:
            validationStepper.previous();
            break;

          case 0:

          default:
            break;
        }
      });
    });
  }
});
