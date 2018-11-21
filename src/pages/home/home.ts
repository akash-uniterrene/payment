import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Paytm } from '@ionic-native/paytm';
//import { RazorpayCheckout } from '@ionic-native/razorpay';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public photos = [];
	;
  constructor(public navCtrl: NavController,private photoLibrary: PhotoLibrary) {

  }
  
  GetGallery(){
	  alert();
	  this.photoLibrary.requestAuthorization().then(() => {
	  this.photoLibrary.getLibrary().subscribe({
		next: library => {
		  library.forEach(function(libraryItem) {
			this.photos.push(libraryItem.photoURL);
			alert(libraryItem.photoURL);
			console.log(libraryItem.id);          // ID of the photo
			console.log(libraryItem.photoURL);    // Cross-platform access to photo
			console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
			console.log(libraryItem.fileName);
			console.log(libraryItem.width);
			console.log(libraryItem.height);
			console.log(libraryItem.creationDate);
			console.log(libraryItem.latitude);
			console.log(libraryItem.longitude);
			console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
		  });
		  alert(this.photos);
		},
		error: err => { alert('could not get photos'); },
		complete: () => { alert('done getting photos'); }
	  });
	})
	.catch(err => alert('permissions weren\'t granted'));
	 alert('err');
  }
  
  startPayment(){
   this.paytm.startPayment('123', '25478', 'akash@uniterrene.com', '9836555023', '500', 'post')
   .then((res: any) => alert(res))
   .catch((error: any) => alert('err'));
  }
  
  pay() {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount: '5000',
      name: 'foo',
      prefill: {
        email: 'pranav@razorpay.com',
        contact: '8879524924',
        name: 'Pranav Gupta'
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };

    var successCallback = function(payment_id) {
      alert('payment_id: ' + payment_id);
    };

    var cancelCallback = function(error) {
      alert(error.description + ' (Error ' + error.code + ')');
    };

    new Razorpay(options).open();
  }
 
}
