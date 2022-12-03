using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Staff.DAL.Migrations
{
    public partial class DishBlobProp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Blob",
                table: "Dish",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Blob",
                table: "Dish");
        }
    }
}
