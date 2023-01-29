using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Staff.DAL.Migrations
{
    public partial class ImplicitPropForCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Implicit",
                table: "Category",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Implicit",
                table: "Category");
        }
    }
}
