import java.sql.*;
import java.util.Scanner;

public class StudentCRUD {
    static final String URL = "jdbc:mysql://localhost:3306/studentdb";
    static final String USER = "root", PASS = "yourpassword"; // Change password here

    public static void main(String[] args) throws Exception {
        Connection con = DriverManager.getConnection(URL, USER, PASS);
        Scanner sc = new Scanner(System.in);
        System.out.println("Connected!");

        while (true) {
            System.out.print("\n1.Insert 2.View 3.Update 4.Delete 5.Exit: ");
            int ch = sc.nextInt();
            if (ch == 5) break;

            switch (ch) {
                case 1: // CREATE
                    PreparedStatement ps1 = con.prepareStatement("insert into student values(?,?)");
                    System.out.print("ID & Name: ");
                    ps1.setInt(1, sc.nextInt()); ps1.setString(2, sc.next());
                    ps1.executeUpdate(); break;
                case 2: // READ
                    ResultSet rs = con.createStatement().executeQuery("select * from student");
                    while (rs.next()) System.out.println(rs.getInt(1) + " " + rs.getString(2));
                    break;
                case 3: // UPDATE
                    PreparedStatement ps3 = con.prepareStatement("update student set name=? where id=?");
                    System.out.print("ID & New Name: ");
                    ps3.setInt(2, sc.nextInt()); ps3.setString(1, sc.next());
                    ps3.executeUpdate(); break;
                case 4: // DELETE
                    PreparedStatement ps4 = con.prepareStatement("delete from student where id=?");
                    System.out.print("ID to delete: ");
                    ps4.setInt(1, sc.nextInt());
                    ps4.executeUpdate(); break;
            }
        }
        con.close();
    }
}