import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ShoppingItem } from "./store/models/shopping-item.model";
import { delay } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class ShoppingService {
  private SHOPPING_URL = "http://localhost:3000/shopping";
  private basePath: string = "/shopping";

  private angularFirestoreCollection: AngularFirestoreCollection<ShoppingItem>;
  private Shopping: Observable<ShoppingItem[]>;

  Logs$: Observable<ShoppingItem[]>;
  LogsAngularFirestoreCollection: AngularFirestoreCollection<ShoppingItem>;
  constructor(private db: AngularFirestore, private http: HttpClient) {}

  public getShoppingItems() {
    console.log("a");
    var start = new Date();
    start.setDate(start.getDate() - 100);
    var end = new Date();
    return this.db
      .collection<ShoppingItem>(this.basePath, ref =>
        ref
          .where("timeStamp", ">=", start)
          .where("timeStamp", "<=", end)
          .orderBy("timeStamp", "desc")
      )
      .valueChanges();
  }
  public addShoppingItem(shoppingItem: ShoppingItem) {
    return  this.db.collection(this.basePath).add(shoppingItem);
     
  }

  deleteShoppingItem(id: string) {
    //return this.http.delete(`${this.SHOPPING_URL}/${id}`).pipe(delay(500));
  }
}
