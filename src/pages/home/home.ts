import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, IonicPage } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    // songs: AngularFireList<any>;
    songs;

    
    constructor(public navCtrl: NavController, public alertCtrl: AlertController,
        public afDatabase: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
        // this.songs = afDatabase.list('/songs/').valueChanges();
        this.songs = afDatabase.list('/songs/').valueChanges();

    }
    
    addSong() {
        let prompt = this.alertCtrl.create({
            title: 'Song Name',
            message: 'Enter a name for this new song',
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => { console.log('Cancel clicked'); }
                },
                {
                    text: 'Save',
                    handler: data => {
                        // const newSongRef = this.songs.push({});
                        // 
                        // newSongRef.set ({
                        //     id: newSongRef.key,
                        //     title: data.title
                        // });
                        const newSongRef = this.afDatabase.list('/songs/').push({});
                        
                        newSongRef.set ({
                             id: newSongRef.key,
                             title: data.title
                        });

                    }
                }
            ]
        });
        prompt.present();
    }
    
    showOptions(songId, songTitle) {
        console.log('songId',songId);
        console.log('songTitle',songTitle);
        let actionSheet = this.actionSheetCtrl.create({
            title: 'What do you want to do?',
            buttons: [
                {
                    text: 'Delete Song',
                    role: 'destructive',
                    handler: () => {
                        this.removeSong(songId);
                    }
              },
              {
                text: 'Update title',
                handler: () => {
                  this.updateSong(songId, songTitle);
                }
              },
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }
            ]
        });
        actionSheet.present();
    }
    
    removeSong(songId: string) {
        // this.songs.remove(songId);
        console.log('songId',songId);
        this.afDatabase.list('/songs/').remove(songId);
    }
    
    updateSong(songId,songTitle) {
        let prompt = this.alertCtrl.create({
            title: 'Song Name',
            message: "Update the name for this song",
            inputs: [
                {
                  name: 'title',
                  placeholder: 'Title',
                  value: songTitle
                },
            ],
            buttons: [
                {
                  text: 'Cancel',
                  handler: data => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Save',
                  handler: data => {
                      
                      
                    // this.songs.update(songId, {
                    //   title: data.title
                    // });
                    this.afDatabase.list('/songs/').update(songId, {
                        title: data.title
                    });
                    
                  }
                }
            ]
        });
        prompt.present();
    }


}
