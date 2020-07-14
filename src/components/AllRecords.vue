<template>
	<div class="col-md-12">
		<div class="col-sm-12 pt-3 p-0">
			<p class="fnt-18 font-weight-bold">All Records</p>
     <div class="wrapper_loader" v-if="!loading"> <div class="loader"></div> </div>
			<ul class="account-list position-relative">
				<li v-for="(record, index) in records" :key="index">
					Name: <a href="">{{ record.title }}</a>
					<a style="cursor:pointer" @click="deleteRecord(record.id)">
						<span class="account_list_icon">
							<i class="fas fa-trash fnt-20 inpt-icon"></i
						></span>
					</a>
					<a style="cursor:pointer" @click="editRecord(record.id)">
						<span class="account_list_icon" style="right:50px">
							<i class="fas fa-pen fnt-20 inpt-icon"></i
						></span>
					</a>
					<br /><br />
					<h6>{{ record.desc }}</h6>
				</li>
			</ul>

			
		</div>
		<Menu></Menu>
	</div>
</template>

<script>
import Menu from "./Menu";
import DataService from "./Services/DataService";
import swal from "sweetalert";

export default {
	name: "Records",
	
	data() {
		return {
			records: [],
			loading: false,
		};
	},
	methods: {
		getResults() {
			DataService.getRecords()
				.then(response => {
					this.records = response.data;
					this.loading = true;
				})
				.catch(e => {
					console.log(e);
					this.loading = false;
				});
		},
		deleteRecord(itemId) {
			swal("Are you want to delete this record?", {
				buttons: {
					cancel: "Cancel",
					catch: {
						text: "Confirm",
						value: "catch"
					}
				}
			}).then(value => {
				switch (value) {
					case "catch":
						DataService.delete(itemId)
							.then(response => {
								console.log(response.data);
								swal("Record", "Deleted Successfully!", "success");
								this.refreshList();
							})
							.catch(e => {
								console.log(e);
							});
						break;
				}
			});
		},
		refreshList() {
			this.getResults();
		},
		editRecord(recordId) {
			this.$router.push({ name: "edit-record", params: { id: recordId } });
		}
	},
	mounted() {
		this.getResults();
	},
	components: {
		Menu
	}
};
</script>
