$(document).ready(function(){
	//Side bar screen height adjustment according to window
	var screenWidth = $(window).width();
	var screenHeight = $(window).height();
	
	$("body").css({'width': screenWidth, 'min-height': screenHeight});

	$(".side-menu").css('height', screenHeight);
	$(window).resize(function() {
		var screenHeight = $(window).height();
		$(".side-menu").css('height', screenHeight);
	});		
	
	// To set active class	
	$('.nav li ').click(function() {
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');
    });
	
/* Data Table Scroll */
	
	$('#customer').DataTable({
        "order": [[ 0, "asc" ]],
        "scrollX": true
    })
    
    $('#customercreditbalancetable').DataTable({
        "order": [[ 0, "asc" ]]
    }) 
    
    $('.download').DataTable({
	"order": [[ 0, "asc" ]],
			"scrollX": true,
   	        dom: 'lBfrtip',
	        buttons: [
	            { 
	                extend: 'collection',
	                text: 'Download As &nbsp; <i class="fa fa-download"></i> ',
	                buttons: [ 
	                           {
	                        	   extend: 'print',
	        	                },
	        	                {
	        	                  extend: 'pdfHtml5',
	        	                },
	        	                {
	        	                	extend: 'excelHtml5',
	        	                    customize: function ( xlsx ){
	        	                        var sheet = xlsx.xl.worksheets['sheet1.xml'];
	        	                        // jQuery selector to add a border
	        	                        $('row c[r*="10"]', sheet).attr( 's', '25' );
	        	                    }
	        	                },
	        	                'csv',
	        	                'copyHtml5'
	        	                
	                ],
	            language: {
	                buttons: {
	                    copyTitle: '',
	                    copyKeys: '',
	                    copySuccess: {
	                        _: 'Copiés %d rangs',
	                        1: 'Copié 1 rang'
	                    }
	                }
	            }
	           }
	        ] 
	});
	
});