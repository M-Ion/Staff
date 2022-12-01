using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Staff.DAL.Migrations
{
    public partial class AddCompanySafeKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Safe",
                table: "Company",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Safe",
                table: "Company");
        }
    }
}
