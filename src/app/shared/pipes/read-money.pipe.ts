import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'readMoney' })
export class ReadMoneyPipe implements PipeTransform {
  constructor() { }
  transform(value: number): string {
    var stringed = value.toString();
    if (!stringed.includes(".")) {
      return this.readMoney(stringed) + " đồng chẵn.";
    } else {
      const p1 = this.readMoney(stringed.split(".")[0]);
      const p2 = this.readMoney(stringed.split(".")[1]);
      return `${p1} phẩy ${p2.toLocaleLowerCase()} đồng lẻ.`;
    }
  }

  readGroup(group: string) {
    var readDigit = [" Không", " Một", " Hai", " Ba", " Bốn", " Năm", " Sáu", " Bảy", " Tám", " Chín"];
    var temp = "";
    if (group == "000") return "";
    //read number hundreds
    temp = readDigit[parseInt(group.substring(0, 1))] + " Trăm";
    //read number tens
    if (group.substring(1, 2) == "0")
      if (group.substring(2, 3) == "0") return temp;
      else {
        temp += " Lẻ" + readDigit[parseInt(group.substring(2, 3))];
        return temp;
      }
    else
      temp += readDigit[parseInt(group.substring(1, 2))] + " Mươi";
    //read number
    if (group.substring(2, 3) == "5") temp += " Lăm";
    else if (group.substring(2, 3) != "0") temp += readDigit[parseInt(group.substring(2, 3))];
    return temp;
  }
  readMoney(num: string) {
    if ((num == null) || (num == "")) return "";
    var temp = "";
    //length <= 18
    while (num.length < 18) {
      num = "0" + num;
    }
    var g1 = num.substring(0, 3);
    var g2 = num.substring(3, 6);
    var g3 = num.substring(6, 9);
    var g4 = num.substring(9, 12);
    var g5 = num.substring(12, 15);
    var g6 = num.substring(15, 18);
    //read group1 ---------------------
    if (g1 != "000") {
      temp = this.readGroup(g1);
      temp += " Triệu";
    }
    //read group2-----------------------
    if (g2 != ("000")) {
      temp += this.readGroup(g2);
      temp += " Nghìn";
    }
    //read group3 ---------------------
    if (g3 != ("000")) {
      temp += this.readGroup(g3);
      temp += " Tỷ";
    } else if ("" != (temp)) {
      temp += " Tỷ";
    }

    //read group2-----------------------
    if (g4 != ("000")) {
      temp += this.readGroup(g4);
      temp += " Triệu";
    }
    //---------------------------------
    if (g5 != ("000")) {
      temp += this.readGroup(g5);
      temp += " Nghìn";
    }
    //-----------------------------------
    temp = temp + this.readGroup(g6);
    //---------------------------------
    // Refine
    temp = temp.replace(/Một Mươi/g, "Mười");
    temp = temp.trim();
    temp = temp.replace(/Không Trăm/g, "");
    //        if (temp.indexOf("Không Trăm") == 0) temp = temp.substring(10);
    temp = temp.trim();
    temp = temp.replace(/Mười Không/g, "Mười");
    temp = temp.trim();
    temp = temp.replace(/Mươi Không/g, "Mươi");
    temp = temp.trim();
    if (temp.indexOf("Lẻ") == 0) temp = temp.substring(2);
    temp = temp.trim();
    temp = temp.replace(/Mươi Một/g, "Mươi Mốt");
    temp = temp.trim();

    //Change Case
    return temp.substring(0, 1).toUpperCase() + temp.substring(1).toLowerCase();
  }
}